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
import { ConfigAppModule } from './config/config-app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule, ConfigAppModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('DB_URL'),
            }),
            inject: [ConfigService],
        }),
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
