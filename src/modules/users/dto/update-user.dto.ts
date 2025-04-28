import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Add any fields that are in UpdateUserDto but not in CreateUserDto
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  profilePicture?: string;
}
