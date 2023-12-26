import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
// import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // esto solo para .env
    MongooseModule.forRootAsync(
      // esto pasa .env, sin .env solo va forRoot
      {
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGODB_URI'),
        }),
        inject: [ConfigService],
      },
      // 'mongodb://user:password@127.0.0.1/nombre_bdd',
      //'mongodb://127.0.0.1/nombre_bdd',// en el localhost
    ),

    UsersModule, // Luego se crea el servicio con el repositorio
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
