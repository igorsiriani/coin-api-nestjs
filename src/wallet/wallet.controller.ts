import { Body, Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { Request, Response } from 'express'
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { WalletDto } from "./dto/wallet.dto";


@Controller('wallet')
export class WalletController {
     constructor(private readonly walletService : WalletService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async creatWallet(@Req() request: any, @Res() response: Response, @Body() walletDto: WalletDto):Promise<any>{
        try {
            const result = await this.walletService.createWallet(request.user.id, walletDto.name, walletDto.coins);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully created wallet!',
                result: result,
            });
        } catch (err) {
            return response.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!',
            });
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllWallets(@Req() request: any, @Res() response: Response):Promise<any>{
        try{
            const result = await this.walletService.getAllWallets(request.user.id);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: result
            });
        } catch(err) {
            return response.status(500).json({
                status: 'Error!',
                message : 'Internal Server Error!'
            });
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getWallet(@Req() request: any, @Res() response: Response):Promise<any>{
        try{
            const result = await this.walletService.getWalletById(request.params.id);

            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: result
            });
        } catch(err) {
            return response.status(500).json({
                status: 'Error!',
                message : 'Internal Server Error!'
            });
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateWallet(@Req() request: any, @Res() response: Response, @Body() walletDto: WalletDto):Promise<any>{
        try {
            const result = await this.walletService.updateWallet(walletDto.name, walletDto.coins, request.params.id);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully updated data!',
                result: result
            })
        } catch(err) {
            return response.status(500).json({
                status: 'Error!',
                message : 'Internal Server Error!'
            })
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async DeleteWallet(@Req() request: any, @Res() response: Response):Promise<any>{
        try {
            const result = await this.walletService.deleteWallet(request.params.id);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully deleted data!'
            })
        } catch(err) {
            return response.status(500).json({
                status: 'Error!',
                message : 'Internal Server Error!'
            })
        }
    }
}