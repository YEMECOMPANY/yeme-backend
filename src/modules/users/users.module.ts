import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersServiceService } from './providers/users.service.service';

@Module({
  controllers: [UsersController],
  providers: [UsersServiceService],
})
export class UsersModule {}
