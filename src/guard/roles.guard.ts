import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userRepository: UserRepository,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRole = this.reflector.get<Role>(
            'role',
            context.getHandler(),
        );
        if (!requiredRole) {
            return true;
        }

        const createPostDto = context.switchToHttp().getRequest()
            .body as CreatePostDto;
        const users: User[] = await this.userRepository.find({
            _id: new Types.ObjectId(createPostDto.created_by),
        });
        return users && users.length && users[0].role === requiredRole;
    }
}
