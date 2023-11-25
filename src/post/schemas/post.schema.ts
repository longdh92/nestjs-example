import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    created_by: Types.ObjectId;

    @Prop()
    image: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.set('collection', 'post');
