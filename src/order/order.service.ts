import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async findOrderWithDetails(): Promise<Order[]> {
        return this.orderRepository.findOrderWithDetails();
    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderRepository.createOrder(createOrderDto);
    }
}
