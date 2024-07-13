import { ConflictException, Injectable } from "@nestjs/common";
import { Favorite } from "./favorite.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";



@Injectable()
export class FavoriteService{

    constructor(
        @InjectModel('Favorite')
        private readonly favoriteModel: Model<Favorite>,){}

    async getFavorites(user_id: string):Promise<any>{
        return this.favoriteModel.find({
            user_id
        });
    }

    async createFavorite(user_id: string, fav_list: string[]): Promise<any>{
        let hasFav = await this.favoriteModel.find({
            user_id: user_id
        });

        if (hasFav.length > 0) {
            await this.favoriteModel.updateOne({ user_id }, { user_id, fav_list });
            return this.favoriteModel.find({
                user_id
            });
        }
        const newFav = new this.favoriteModel({ user_id, fav_list });
        const result = await newFav.save();
        return result
    }

    async updateFavorite(user_id: string, fav_list: string[]): Promise<any>{
        await this.favoriteModel.updateOne({ user_id }, { user_id, fav_list });
        return this.favoriteModel.find({
            user_id
        });
    }

    async deleteFavorite(user_id: string):Promise<any>{
        return this.favoriteModel.deleteOne({ user_id });
    }
}