import { Prisma } from "@prisma/client";

export class Wallet implements Prisma.WalletUncheckedCreateInput {
    user_id: string;
}


export class Coin implements Prisma.CoinUncheckedCreateInput {
    wallet_id: string;
    name: string;
}