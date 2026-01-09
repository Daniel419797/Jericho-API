import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { config } from '../../../config';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(email: string, password: string) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('User already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      passwordHash,
      isActive: true,
      isEmailVerified: false,
      tier: 'casual',
    } as any);

    // Optionally return user without passwordHash
    const { passwordHash: _ph, ...rest } = user as any;
    return rest as unknown;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.passwordHash || '');
    if (!match) throw new Error('Invalid credentials');

    // Type assertions to satisfy jsonwebtoken typings
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      config.jwt.secret as unknown as jwt.Secret,
      { expiresIn: config.jwt.expiresIn as any },
    );

    return { token, user };
  }

  async verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, config.jwt.secret);
      return payload as Record<string, unknown>;
    } catch (err) {
      return null;
    }
  }

  // The following functions are left as stubs for future implementation
  async refreshToken(_refreshToken: string) {
    throw new Error('Not implemented');
  }

  async verifyEmail(_token: string) {
    throw new Error('Not implemented');
  }

  async forgotPassword(_email: string) {
    throw new Error('Not implemented');
  }

  async resetPassword(_token: string, _newPassword: string) {
    throw new Error('Not implemented');
  }
}
