import { Prisma } from "@prisma/client";
import * as mongoose from 'mongoose';

export const FavoriteSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    fav_list: { type: Array<String>, required: true },
});

export interface Favorite{
    id: String;
    user_id: String;
    fav_list: String[];
}