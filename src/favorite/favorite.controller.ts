import { Body, Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { FavoriteService } from "./favorite.service";
import { Request, Response } from 'express'
import { JwtAuthGuard } from "src/authentication/auth.guard";


@Controller('favorite')
export class FavoriteController {
     constructor(private readonly favoriteService : FavoriteService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async creatFavorite(@Req() request: any, @Res() response: Response, @Body('favorites') favorites: string[]):Promise<any>{
        try {
            const result = await this.favoriteService.createFavorite(request.user.id, favorites);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully created favorite!',
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
    async getFavorites(@Req() request: any, @Res() response: Response):Promise<any>{
        try{
            const result = await this.favoriteService.getFavorites(request.user.id);
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

    @Put()
    @UseGuards(JwtAuthGuard)
    async updateFavorite(@Req() request: any, @Res() response: Response, @Body('favorites') favorites: string[]):Promise<any>{
        try {
            const result = await this.favoriteService.updateFavorite(request.user.id, favorites);
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

    @Delete()
    @UseGuards(JwtAuthGuard)
    async DeleteFavorite(@Req() request: any, @Res() response: Response):Promise<any>{
        try {
            const result = await this.favoriteService.deleteFavorite(request.user.id);
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