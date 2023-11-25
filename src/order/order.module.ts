import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import {
    OrderDetails,
    OrderDetailsSchema,
} from './schemas/order-details.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema },
            { name: OrderDetails.name, schema: OrderDetailsSchema },
        ]),
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
})
export class OrderModule {}
