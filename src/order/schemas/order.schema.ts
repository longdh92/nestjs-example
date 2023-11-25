import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop()
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ type: [Types.ObjectId], ref: 'OrderDetails' })
    orderDetails: Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.set('collection', 'order');
