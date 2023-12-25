import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserSettingsDto } from './CreateUsetSetting.dto';
import { Type } from 'class-transformer';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsOptional()
  @ValidateNested() // OJO, ES PARA EMBEBER AL OBJETO de createusersettingdto
  @Type(() => CreateUserSettingsDto)
  settings?: CreateUserSettingsDto; // este es el dto que se está embebiendo y esto se actualiza en user.service del create para que no de error, se cre un obejtos. ojo mediane el {settings,...createUserDto}:
}
