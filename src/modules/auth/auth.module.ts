import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AuthService } from './providers/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ProtectedController } from './controllers/protected.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import jwtConfig from '../../config/jwt.config';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (jwtConfiguration: ConfigType<typeof jwtConfig>) => ({
        secret: jwtConfiguration.secret,
        signOptions: {
          expiresIn: jwtConfiguration.expiresIn,
          audience: jwtConfiguration.audience,
          issuer: jwtConfiguration.issuer,
        },
      }),
    }),
  ],
  controllers: [AuthController, ProtectedController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
