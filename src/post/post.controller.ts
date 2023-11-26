import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostSchema } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Role } from '../enum/role.enum';
import { RolesGuard } from '../guard/roles.guard';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get(':userId')
    async getPostsByUser(
        @Param('userId') userId: string,
    ): Promise<PostSchema[]> {
        return this.postService.getPostsByUser(userId);
    }

    @Post()
    @SetMetadata('role', Role.Admin)
    @UseGuards(RolesGuard)
    async createPost(
        @Body() createPostDto: CreatePostDto,
    ): Promise<PostSchema> {
        return this.postService.createPost(
            createPostDto.title,
            createPostDto.content,
            createPostDto.created_by,
            createPostDto.image,
        );
    }
}
