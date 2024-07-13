import { IsArray, IsString, Length } from "class-validator";


export class WalletDto {
    @IsString()
    @Length(1, 30)
    name: string;

    @IsArray()
    @Length(1, 10)
    coins: string[];
}