import { Body, Controller, Delete, Get, Put, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import {Request,Response} from 'express'
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { RegisterUserDto } from "src/authentication/dto/register-user.dto";


@Controller('users')
export class UserController {
     constructor(private readonly userService : UserService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
        try{
            const result = await this.userService.getAllUsers();
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: result
            })
        }catch(err){
            return response.status(500).json({
                status: 'Ok!',
                message : 'Internal Server Error!'
            })
        }
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@Req() request: any, @Res() response: Response):Promise<any>{

        return response.status(200).json({
            status: 'Ok!',
            message: 'Successfully fetch data!',
            result: {
                name: request.user.name,
                email: request.user.email
            }
        })
    }

    @Put('me')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Req() request: any, @Res() response: Response, @Body() registerDto: RegisterUserDto):Promise<any>{
        try{
            const result = await this.userService.updateUser(registerDto, request.user.email);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully updated data!',
                result: result
            })
        }catch(err){
            return response.status(500).json({
                status: 'Ok!',
                message : 'Internal Server Error!'
            })
        }
    }

    @Delete('me')
    @UseGuards(JwtAuthGuard)
    async DeleteUser(@Req() request: any, @Res() response: Response):Promise<any>{
        try{
            const result = await this.userService.deleteUser(request.user.email);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully deleted data!'
            })
        }catch(err){
            return response.status(500).json({
                status: 'Ok!',
                message : 'Internal Server Error!'
            })
        }
    }
}