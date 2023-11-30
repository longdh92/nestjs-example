import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { RolesGuard } from '../guard/roles.guard';
import { UserRepository } from '../user/user.repository';
import { User, UserSchema } from '../user/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import adminConfiguration from './admin-configuration';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Post.name, schema: PostSchema },
            { name: User.name, schema: UserSchema },
        ]),
        ConfigModule.forRoot({
            load: [adminConfiguration],
        }),
    ],
    controllers: [PostController],
    providers: [PostRepository, PostService, RolesGuard, UserRepository],
})
export class PostModule {}
