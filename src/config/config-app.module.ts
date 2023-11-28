import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`],
        }),
    ],
})
export class ConfigAppModule {}
