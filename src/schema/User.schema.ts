import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSetting.schema';
import { Post } from './Post.schema';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop()
  displayName?: string; // en caso que no coloque nada ira undefined se usa el ?

  @Prop({ required: false })
  avatarUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;
  //se añade al User.dto

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref:'Post'}]}) // varios a uno se usa el array
  posts: Post[]
}

export const UserShema = SchemaFactory.createForClass(User);
// luego rgistrar en el users.module
