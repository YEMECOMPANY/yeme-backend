import { UserRole } from '../../users/entities/user.entity';

export interface ActiveUserData {
  /**
   * The user's unique identifier (UUID)
   */
  sub: string;

  /**
   * The user's email address
   */
  email: string;

  /**
   * The user's role
   */
  role: UserRole;

  /**
   * When the token was issued (automatically added by JWT)
   */
  iat?: number;

  /**
   * When the token expires (automatically added by JWT)
   */
  exp?: number;

  /**
   * Intended audience for this token
   */
  aud?: string;

  /**
   * Issuer of the token
   */
  iss?: string;
}
