import { IsString, Length } from "class-validator";


export class RegisterUserDto {
    @IsString()
    @Length(5, 100)
    email: string;

    @IsString()
    @Length(6, 30)
    password: string;

    @IsString()
    @Length(1, 100)
    name: string
}