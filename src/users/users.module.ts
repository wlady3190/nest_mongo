import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { User, UserShema } from 'src/schema/User.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  UserSettings,
  UserSettingsSchema,
} from 'src/schema/UserSetting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserShema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
    ]),
  ],

  providers: [UsersService],

  controllers: [UsersController],
})
export class UsersModule {}
