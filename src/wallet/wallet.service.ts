import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Wallet } from "./wallet.model";
import * as bcrypt from 'bcrypt';
import { User } from "@prisma/client";



@Injectable()
export class WalletService{

    constructor(private prisma: PrismaService){}

    async getAllWallets(user_id: string):Promise<any>{
        return this.prisma.wallet.findMany({
            where: {
                user_id: user_id
            },
            include: {
                coins: true
            }
        });
    }

    async getWalletById(id: string):Promise<Wallet>{
        return this.prisma.wallet.findUnique({
            where: {
                id
            },
            include: {
                coins: true
            }
        }) 
    }

    
    async createWallet(user_id: string, coins: string[]): Promise<any>{
        return new Promise(async (resolve) => {
            let res_wallet =  await this.prisma.wallet.create({
                data: {
                    user_id
                }
            });

            let coin_list = []
            let control = 0;
            coins.forEach(async (coin) => {
                coin_list.push({
                    wallet_id: res_wallet.id,
                    name: coin
                });
                control += 1;
                if (control === coins.length) {
                    let res_coins = await this.prisma.coin.createMany({
                        data: coin_list
                    });
            
                    let result = await this.prisma.wallet.findUnique({
                        where: {
                            id: res_wallet.id
                        },
                        include: {
                            coins: true
                        }
                    });

                    resolve(result);
                }
            });
        });
    }

    async updateWallet(coins: string[], wallet_id: string): Promise<any>{
        return new Promise(async (resolve) => {
            await this.prisma.coin.deleteMany({
                where: {
                    wallet_id
                }
            });
            let coin_list = []
            let control = 0;
            coins.forEach(async (coin) => {
                coin_list.push({
                    wallet_id,
                    name: coin
                });
                control += 1;
                if (control === coins.length) {
                    let res_coins = await this.prisma.coin.createMany({
                        data: coin_list
                    });
            
                    let result = await this.prisma.wallet.findUnique({
                        where: {
                            id: wallet_id
                        },
                        include: {
                            coins: true
                        }
                    });

                    resolve(result);
                }
            });
        });
    }

    async deleteWallet(wallet_id: string):Promise<Wallet>{
        await this.prisma.coin.deleteMany({
            where: {
                wallet_id
            }
        });
        return this.prisma.wallet.delete({
            where: {
                id: wallet_id
            }
        });
    }
}