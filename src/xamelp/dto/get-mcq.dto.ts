import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class getMcqDto {
    @ApiProperty(
        {
            description: 'id',
            type: String,
            required: true,
            default: '1'
        }
    )
    @IsString()
    id : string;
}