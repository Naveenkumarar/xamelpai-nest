import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class askQuestionDto {
    @ApiProperty(
        {
            description: 'question',
            type: String,
            required: true,
            default: 'question'
        }
    )
    @IsString()
    question : string;
    @ApiProperty(
        {
            description: 'name',
            type: String,
            required: true,
            default: 'question'
        }
    )
    @IsString()
    name : string
}