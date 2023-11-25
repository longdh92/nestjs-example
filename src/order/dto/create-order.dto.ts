export class CreateOrderDto {
    userId: string;
    productDetails: OrderDetailsDto[];
}

export class OrderDetailsDto {
    productId: string;
    quantity: number;
}
