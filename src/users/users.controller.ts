import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/User.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { log } from 'console';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  //   @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: createUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
    // para activar las validacioes, en main.ts
    
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  //   /users/:id
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    // Middleware para controlar que el ID sea validado
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('No se encuentra el ID', HttpStatus.BAD_REQUEST);
    const findUser = await this.usersService.getUserById(id);

    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('No se encuentra el ID', HttpStatus.BAD_REQUEST);
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    console.log(updatedUser);
    if (!updatedUser) throw new HttpException('User not found', 404);

    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('No user found', 404);
    const deleteUser = await this.usersService.deleteUSer(id);
    if (!deleteUser) throw new HttpException('User Nof found', 404)
    return deleteUser;
  }
}
