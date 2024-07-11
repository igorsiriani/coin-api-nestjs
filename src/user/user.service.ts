import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User } from "./user.model";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService{

    constructor(private prisma: PrismaService){}

    async getAllUsers():Promise<User[]>{
        return this.prisma.user.findMany()
    }

    async getUserByEmail(email: string):Promise<User>{
        return this.prisma.user.findUnique({
            where: {
                email
            }
        }) 
    }

    
    async createUser(data:User): Promise<User>{
        const existing = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        
        if (existing) {
            throw new ConflictException('email already exists');
        }
        
        return this.prisma.user.create({
            data,
        });
    }

    async updateUser(user: User, email: string):Promise<User>{
        return this.prisma.user.update({
            data: {
                name: user.name,
                email: user.email,
                password: await bcrypt.hash(user.password, 10)
            },
            where: {
                email
            }
        }) 
    }

    async deleteUser(email: string):Promise<User>{
        return this.prisma.user.delete({
            where: {
                email
            }
        }) 
    }
}