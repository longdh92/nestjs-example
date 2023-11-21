import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    created_by: string;

    @Prop()
    image: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.set('collection', 'post');
