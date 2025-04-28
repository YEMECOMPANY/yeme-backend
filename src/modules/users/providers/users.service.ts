import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    // Check if phone number already exists
    const existingUserByPhone = await this.usersRepository.findOne({
      where: { phoneNumber: createUserDto.phoneNumber },
    });

    if (existingUserByPhone) {
      throw new ConflictException('Phone number already exists');
    }

    // Create user entity from DTO (without saving yet)
    const user = this.usersRepository.create({
      ...createUserDto,
      // Remove password from createUserDto to avoid using it directly
      password: undefined,
    });

    // Hash password and set it on the user entity
    user.password = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    // Save the user to the database
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Check if phone number is being updated and ensure it's unique
    if (
      updateUserDto.phoneNumber &&
      updateUserDto.phoneNumber !== user.phoneNumber
    ) {
      const existingUserWithPhone = await this.usersRepository.findOne({
        where: { phoneNumber: updateUserDto.phoneNumber },
      });

      if (existingUserWithPhone && existingUserWithPhone.id !== id) {
        throw new ConflictException('Phone number already exists');
      }
    }

    // Check if email is being updated and ensure it's unique
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUserWithEmail = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUserWithEmail && existingUserWithEmail.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    // Handle password updates separately
    const { password, ...otherFields } = updateUserDto;

    // Apply all non-password updates
    Object.assign(user, otherFields);

    // If password provided, hash it and update directly
    if (password) {
      user.password = await this.passwordService.hashPassword(password);
    }

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async markEmailAsVerified(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    user.isEmailVerified = true;
    return this.usersRepository.save(user);
  }

  async validateUserPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const isPasswordValid = await this.passwordService.validatePassword(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        return null;
      }

      return user;
    } catch (error) {
      return null;
    }
  }
}
