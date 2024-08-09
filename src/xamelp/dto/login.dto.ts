import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class loginDto {
    @ApiProperty(
        {
            description: 'username',
            type: String,
            required: true,
            default: 'admin'
        }
    )
    @IsString()
    username : string;
    @ApiProperty(
        {
            description: 'password',
            type: String,
            required: true,
            default: 'admin'
        }
    )
    @IsString()
    password : string;
}
