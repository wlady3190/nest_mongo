import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { createUserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schema/UserSetting.schema';

@Injectable()
export class UsersService {
  //aqui se esta configurando el Model de user y e embebed de UseSettings
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingModel: Model<UserSettings>,
  ) {}
  async createUser({ settings, ...createUserDto }: createUserDto) {
    // Luego se agrega en el providers en users.module
    if (settings) {
      const newSettings = new this.userSettingModel(settings);
      const saveNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: saveNewSettings._id,
      });
      return newUser.save()
    }

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find().populate('settings');
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings'); // POPULATE para ver los embebidos, no solo el ID <- OJOOOOOOOOOOOOOO
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }); // si no se tiene el dto, se puede especificar los campos => new para devolver el documento actualizado
  }

  deleteUSer(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
