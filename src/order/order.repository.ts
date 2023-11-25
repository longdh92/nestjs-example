import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model, Types } from 'mongoose';
import {
    OrderDetails,
    OrderDetailsDocument,
} from './schemas/order-details.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(OrderDetails.name)
        private orderDetailsModel: Model<OrderDetailsDocument>,
    ) {}

    async findOrderWithDetails(): Promise<Order[]> {
        return this.orderModel
            .find()
            .populate({ path: 'userId', select: '-password' })
            .populate({ path: 'orderDetails' });
    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const newOrderId = new Types.ObjectId();
        const orderDetails: Types.ObjectId[] = [];

        // save order details
        for (const orderDetailsDto of createOrderDto.productDetails) {
            const newOrderDetailsModel = new this.orderDetailsModel({
                _id: new Types.ObjectId(),
                orderId: newOrderId,
                productId: new Types.ObjectId(orderDetailsDto.productId),
                quantity: orderDetailsDto.quantity,
            });
            const orderDetail: OrderDetails = await newOrderDetailsModel.save();
            orderDetails.push(orderDetail._id);
        }

        // save order
        const newOrderModel = new this.orderModel({
            _id: newOrderId,
            userId: new Types.ObjectId(createOrderDto.userId),
            orderDetails: orderDetails,
        });
        return await newOrderModel.save();
    }
}
