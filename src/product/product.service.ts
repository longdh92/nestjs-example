import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { ProductRepository } from './product.repository';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getProducts(): Promise<Product[]> {
        return this.productRepository.find({});
    }

    async createProduct(
        name: string,
        description: string,
        price: number,
    ): Promise<Product> {
        return this.productRepository.create({
            _id: new Types.ObjectId(),
            name,
            description,
            price,
        });
    }
}
