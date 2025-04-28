import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { UsersService } from '../../users/providers/users.service';
import { PasswordService } from '../../users/providers/password.service';
import { LoginDto } from '../dto/login.dto';
import jwtConfig from '../../../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      const isPasswordValid = await this.passwordService.validatePassword(
        password,
        user.password,
      );

      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: Omit<ActiveUserData, 'iat' | 'exp' | 'aud' | 'iss'> = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.expiresIn,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      }),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}
