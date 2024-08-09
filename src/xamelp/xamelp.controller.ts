import { Body, Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { XamelpService } from './xamelp.service';
import {Response} from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';
import { uploadPdfDto } from './dto/upload-pdf.dto';
import { askQuestionDto } from './dto/ask-question.dto';
import { getMcqDto } from './dto/get-mcq.dto';

@ApiTags('Chat')
@Controller('xamelapai')
export class XamelpController {
  constructor(private readonly xamelpService: XamelpService) {}

  @Post('login')
  @ApiBody({type:loginDto})
  login(@Body() data, @Res() res:Response){
      return this.xamelpService.login(data,res);
  }

  @Post('pdf')
  @ApiBody({type:uploadPdfDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('pdf'))
  createPdf(@UploadedFile() file,@Body() data, @Res() res:Response){
      return this.xamelpService.createPdf(file,data.name,res);
  }

  @Get('question')
  @ApiBody({type:askQuestionDto})
  askQues(@Query("question") ques:string,@Query("name") name:string, @Res() res:Response){
    return this.xamelpService.askQues(ques,name,res);
  }

  @Get('mcq')
  @ApiBody({type:getMcqDto})
  mcq(@Query("count") count:string,@Query("name") name:string, @Res() res:Response){
    return this.xamelpService.mcq(count,name,res);
  }

}
