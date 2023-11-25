import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
        UserModule,
        PostModule,
        ProductModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
