import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
                PORT: Joi.number().default(3000),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: false,
            },
        }),
    ],
})
export class ConfigAppModule {}
