import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://wlady3190:Wlady3190@wtcluster0.rnyvt4k.mongodb.net/?retryWrites=true&w=majority',

      // 'mongodb://user:password@127.0.0.1/nombre_bdd',
      //'mongodb://127.0.0.1/nombre_bdd',// en el localhost
    ),
    UsersModule, // Luego se crea el servicio con el repositorio
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
