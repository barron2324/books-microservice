import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v1 as uuidv1 } from 'uuid';

@Schema({ collection: 'category', timestamps: true, versionKey: false })
export class Category extends Document {
    @Prop({
        type: String,
        unique: true,
        index: true,
        default: () => uuidv1(),
    })
    categoryId?: string

    @Prop({
        type: String,
        required: true,
        index: true
    })
    categoryName: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)