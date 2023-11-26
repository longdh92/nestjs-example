import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../enum/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop({ default: Role.User })
    address: string;

    @Prop()
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('collection', 'user');
