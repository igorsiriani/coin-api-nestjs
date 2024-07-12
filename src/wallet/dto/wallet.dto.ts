import { IsArray, Length } from "class-validator";


export class WalletDto {
    @IsArray()
    @Length(1, 10)
    coins: string[];
}