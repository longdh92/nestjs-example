import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { Types } from 'mongoose';
import { CreateOrderValidationPipe } from '../pipe/create-order-validation.pipe';
import { PublicDecorator } from '../guard/public.decorator';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UsePipes(CreateOrderValidationPipe)
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderService.createOrder(createOrderDto);
    }

    @Get()
    @PublicDecorator()
    async getOrder(): Promise<Order[]> {
        return this.orderService.findOrderWithDetails({});
    }

    @Get(':code')
    @PublicDecorator()
    async getOrderByCode(@Param('code') code: string): Promise<Order[]> {
        return this.orderService.findOrderWithDetails({
            _id: new Types.ObjectId(code),
        });
    }
}
