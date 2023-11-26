import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { validate } from 'class-validator';

@Injectable()
export class CreateOrderValidationPipe implements PipeTransform {
    async transform(value: any): Promise<any> {
        const createOrderDto = plainToInstance(CreateOrderDto, value);
        const errors = await validate(createOrderDto);

        for (const orderDetailsDto of createOrderDto.productDetails) {
            const errorChilds = await validate(orderDetailsDto);
            errors.push(...errorChilds);
        }

        if (errors.length > 0) {
            const errorMessages = errors.map((error) => {
                const constraints = error.constraints;
                if (constraints) {
                    return Object.values(constraints);
                }
            });
            throw new BadRequestException(
                errorMessages.filter((message) => !!message),
            );
        }

        return value;
    }
}
