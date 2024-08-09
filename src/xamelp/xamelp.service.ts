import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';

const {get_answer_from_pdf} = require("./aiconv")
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class XamelpService {
  constructor(private readonly prisma: PrismaService) {}
  async login(data,res){
    const {username,password} = data
    console.log(username,password)

    const user = await this.prisma.user.findUnique({
        where : {name:username,password:password},
        select : {name:true,id:true,status:true}
    })
    if(user){
        if(user.status==true){
            res.status(200)
            return res.json({"data":user})
        }
        else{
            res.status(400)
            return res.json({"data":"User is inactive"})
        }
    }
    else{
        res.status(400);
        return res.json({"data":"Invalid Username or Password"})
    }
  }

  async createPdf(pdf,name,res){
    if(pdf){
      writeFile(`media/${name}.pdf`,pdf.buffer,(err)=>{
          if (err) throw err;
      })
     await this.prisma.conversation.create({
          data:{
              name:name,
              pdf : `./media/${name}.pdf`
          }
      })
      res.send({"data":"The file has been saved!"});
  }
  else
      res.send({"data":"no file provided"})
  }

  async askQues(question,name,res){
    if(name && question)
      {
          const convo_data = await this.prisma.conversation.findMany({where:{name:String(name)}})
          if(convo_data.length==0){
              res.status(400)
              res.send({"data":"No PDF found","status":false})
          }
          else{
              const pdf = convo_data[0].pdf
              const chat_data = await this.prisma.chat.findMany({where:{conversationId:convo_data[0]['id']},orderBy:{timestamp:'asc'}})
              const memory = []
              if (chat_data.length>0){
                  var index = 0
                  while(index<chat_data.length){
                      memory.push({"role":"user","content":chat_data[index].message})
                      memory.push({"role":"system","content":chat_data[index+1].message})
                      index = index+2
                  }
              }
              var answer = await get_answer_from_pdf(pdf,String(question),memory)
              // var answer = "Hardcore answer";
              
              await this.prisma.chat.createMany({data:[
                  {type:"Human",message:question.toString(),conversationId:convo_data[0].id},
                  {type:"AI",message:answer.toString(),conversationId:convo_data[0].id}
              ]})
              res.send({"data":answer,"status":true})
          }
  
      }
  }

  async mcq(count,name,res){
    if(name && count)
      {
          const question = `Consider yourself the professor and you are preparing question paper for student from the pdf. There are totally ${count} questions which are all in MCQ format each with 4 options. Give me the questions and answers. , can you please rewrite it in the format of a list of JSON with key: question, options in format of json with key - index and value option, answer (only the index). Also refer the images and table if you use it to take a question`
          const convo_data = await this.prisma.conversation.findMany({where:{name:String(name)}})
          if(convo_data.length==0){
              res.status(400)
              res.send({"data":"No PDF found","status":false})
          }
          else{
              const pdf = convo_data[0].pdf
              const chat_data = await this.prisma.chat.findMany({where:{conversationId:convo_data[0]['id']},orderBy:{timestamp:'asc'}})
              const memory = []
              if (chat_data.length>0){
                  var index = 0
                  while(index<chat_data.length){
                      memory.push({"role":"user","content":chat_data[index].message})
                      memory.push({"role":"system","content":chat_data[index+1].message})
                      index = index+2
                  }
              }
              var answer = await get_answer_from_pdf(pdf,String(question),memory)
              
              await this.prisma.chat.createMany({data:[
                  {type:"Human",message:question.toString(),conversationId:convo_data[0].id},
                  {type:"AI",message:answer.toString(),conversationId:convo_data[0].id}
              ]})
              res.send({"data":answer,"status":true})
          }
  
      }
  }
}
