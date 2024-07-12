import { Module } from "@nestjs/common";
import { FavoriteController } from "./favorite.controller";
import { FavoriteService } from "./favorite.service";
import { PrismaService } from "../prisma.service";
import { MongooseModule } from '@nestjs/mongoose'
import { FavoriteSchema } from "./favorite.model";


@Module({
     imports:[MongooseModule.forFeature([{ name: 'Favorite', schema: FavoriteSchema }])],
     controllers : [FavoriteController],
     providers: [FavoriteService, PrismaService]
})
export class FavoriteModule{}