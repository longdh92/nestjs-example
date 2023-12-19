import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../enum/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    _id: Types.ObjectId;

    @Prop({ unique: true })
    username: string;

    @Prop()
    password: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop({ default: Role.User })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('collection', 'user');
