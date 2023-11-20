import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    id: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('collection', 'user');
