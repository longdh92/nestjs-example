import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicDecorator } from './guard/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @PublicDecorator()
    getHello(): string {
        return this.appService.getHello();
    }
}
