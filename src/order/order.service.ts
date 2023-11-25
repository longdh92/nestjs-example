import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterQuery } from 'mongoose';
import { NotFoundExceptionFilter } from '../exception/not-found-exception.filter';

@Injectable()
@UseFilters(NotFoundExceptionFilter)
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async findOrderWithDetails(
        orderFilterQuery: FilterQuery<Order>,
    ): Promise<Order[]> {
        const orders: Order[] =
            await this.orderRepository.findOrderWithDetails(orderFilterQuery);
        if (orders.length === 0) {
            throw new NotFoundException('Order not found.');
        }
        return orders;
    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderRepository.createOrder(createOrderDto);
    }
}
