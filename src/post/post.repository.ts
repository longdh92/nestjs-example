import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
    ) {}

    async create(post: Post): Promise<Post> {
        const newPost = new this.postModel(post);
        return newPost.save();
    }

    async find(postFilterQuery: FilterQuery<Post>): Promise<Post[]> {
        return this.postModel.find(postFilterQuery);
    }
}
