import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    
    @IsString()
    @IsNotEmpty({message : "Please enter"})
    name: string;

    @ApiProperty()
    @IsOptional()
    email: string;

    @ApiProperty()
    password: string;
}
