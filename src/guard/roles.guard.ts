import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/schemas/user.schema';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRole =
            this.reflector.get<Role>('role', context.getHandler()) ||
            this.configService.get('user.requiredRole') ||
            Role.Admin;
        if (!requiredRole) {
            return true;
        }

        const createPostDto = context.switchToHttp().getRequest()
            .body as CreatePostDto;
        const users: User[] = await this.userRepository.find({
            _id: new Types.ObjectId(createPostDto.created_by),
        });
        return users?.length && users[0].role === requiredRole;
    }
}
