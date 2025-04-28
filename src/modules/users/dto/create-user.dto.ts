import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address, must be unique',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'User phone number, must be unique',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'User password, minimum 8 characters',
    example: 'Password123!',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    description: 'User role in the system',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsOptional()
  role?: UserRole;
}
