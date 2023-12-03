import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenResponseDto } from '../user/dto/token-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async login(username: string, password: string): Promise<TokenResponseDto> {
        const user: User = await this.userRepository.findOne({
            username: username,
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: await this.jwtService.signAsync({
                id: user._id,
                username: user.username,
            }),
        };
    }
}
