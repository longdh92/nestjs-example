import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDetailsDocument = OrderDetails & Document;

@Schema()
export class OrderDetails {
    @Prop()
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Order' })
    orderId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Product' })
    productId: Types.ObjectId;

    @Prop()
    quantity: number;
}

export const OrderDetailsSchema = SchemaFactory.createForClass(OrderDetails);
OrderDetailsSchema.set('collection', 'order_details');
