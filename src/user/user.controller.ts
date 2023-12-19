import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicDecorator } from '../guard/public.decorator';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Post('register')
    @PublicDecorator()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(
            createUserDto.username,
            createUserDto.password,
            createUserDto.email,
            createUserDto.address,
            createUserDto.phone,
        );
    }
}
