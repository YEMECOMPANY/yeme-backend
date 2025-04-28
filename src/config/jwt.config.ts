import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
}));
