import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserRole } from '../../users/entities/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { User } from '../../users/entities/user.entity';

@ApiTags('protected')
@Controller('protected')
export class ProtectedController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user profile (requires authentication)',
  })
  getProfile(@CurrentUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin only endpoint' })
  getAdminData() {
    return { message: 'This is protected admin data' };
  }

  @Get('merchant')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MERCHANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Merchant only endpoint' })
  getMerchantData() {
    return { message: 'This is protected merchant data' };
  }
}
