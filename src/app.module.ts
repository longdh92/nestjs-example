import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './exception/not-found-exception.filter';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
        UserModule,
        PostModule,
        ProductModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: NotFoundExceptionFilter,
        },
    ],
})
export class AppModule {}
