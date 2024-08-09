import { IsString } from "@nestjs/class-validator";
import { ApiConsumes, ApiProperty } from "@nestjs/swagger";

export class uploadPdfDto {
    @ApiProperty(
        {
            description: 'pdf',
            type: 'file',
            required: true,
            default: 'pdf'
        }
    )
    pdf : any;
    @ApiProperty(
        {
            description: 'name',
            type: String,
            required: true,
            default: 'pdf'
        }
    )
    @IsString()
    name : string;
}