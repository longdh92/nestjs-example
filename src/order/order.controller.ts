import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { Types } from 'mongoose';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderService.createOrder(createOrderDto);
    }

    @Get()
    async getOrder(): Promise<Order[]> {
        return this.orderService.findOrderWithDetails({});
    }

    @Get(':code')
    async getOrderByCode(@Param('code') code: string): Promise<Order[]> {
        return this.orderService.findOrderWithDetails({
            _id: new Types.ObjectId(code),
        });
    }
}
