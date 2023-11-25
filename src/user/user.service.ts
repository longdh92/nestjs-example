import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

const saltRounds = 10;

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUsers(): Promise<User[]> {
        return this.userRepository.find({});
    }

    async createUser(
        username: string,
        password: string,
        email: string,
        address: string,
        phone: string,
    ): Promise<User> {
        return this.userRepository.create({
            _id: new Types.ObjectId(),
            username,
            password: bcrypt.hashSync(password, saltRounds),
            email,
            address,
            phone,
        });
    }
}
