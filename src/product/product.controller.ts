import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async createProduct(
        @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        return this.productService.createProduct(
            createProductDto.name,
            createProductDto.description,
            createProductDto.price,
        );
    }

    @Get()
    async getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }
}
