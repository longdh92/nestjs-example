import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('collection', 'product');
