import {
    IsNotEmpty,
    IsNumber,
    Length,
    Min,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
    @IsNotEmpty()
    @Length(24, 24)
    userId: string;

    @ValidateNested({ each: true })
    @Type(() => OrderDetailsDto)
    productDetails: OrderDetailsDto[];
}

export class OrderDetailsDto {
    @IsNotEmpty()
    @Length(24, 24)
    productId: string;

    @IsNumber()
    @Min(1)
    quantity: number;
}
