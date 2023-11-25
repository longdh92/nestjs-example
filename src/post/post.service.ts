import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Post } from './schemas/post.schema';
import { Types } from 'mongoose';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    async getPostsByUser(userId: string): Promise<Post[]> {
        return this.postRepository.find({
            created_by: new Types.ObjectId(userId),
        });
    }

    async createPost(
        title: string,
        content: string,
        userId: string,
        image: string,
    ): Promise<Post> {
        return this.postRepository.create({
            _id: new Types.ObjectId(),
            title,
            content,
            created_by: new Types.ObjectId(userId),
            image,
        });
    }
}
