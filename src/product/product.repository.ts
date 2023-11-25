import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

    async find(productsFilterQuery: FilterQuery<Product>): Promise<Product[]> {
        return this.productModel.find(productsFilterQuery);
    }

    async create(product: Product): Promise<Product> {
        const newProduct = new this.productModel(product);
        return newProduct.save();
    }
}
