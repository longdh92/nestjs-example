import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

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
            id: uuidv4(),
            username,
            password: bcrypt.hashSync(password, saltRounds),
            email,
            address,
            phone,
        });
    }
}
