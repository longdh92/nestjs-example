import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Post } from './schemas/post.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    async getPostsByUser(userId: string): Promise<Post[]> {
        return this.postRepository.find({ created_by: userId });
    }

    async createPost(
        title: string,
        content: string,
        userId: string,
        image: string,
    ): Promise<Post> {
        return this.postRepository.create({
            id: uuidv4(),
            title,
            content,
            created_by: userId,
            image,
        });
    }
}
