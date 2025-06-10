import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  googleLoginWithToken(token: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    const { email, password, name, age } = registerDto;

    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const newUser = this.usersService.create({
      name,
      email,
      password: hashedPassword,
      age,
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    // Find user by email
    const user = this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Payload for JWT
    const payload = { sub: user.id, email: user.email };

    // Sign JWT
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  //google login
  async googleLogin(req: any): Promise<any> {
  if (!req.user) {
    throw new UnauthorizedException();
  }

  // Cek apakah user sudah ada di database
  let user = await this.usersService.findByEmail(req.user.email);
  if (!user) {
    // Kalau belum, register otomatis
    user = await this.usersService.create({
      name: req.user.name,
      email: req.user.email,
      password: '', // kosong karena OAuth
      age: 0,       // bisa disesuaikan atau optional
    });
  }

  const payload = { sub: user.id, email: user.email };
  const token = await this.jwtService.signAsync(payload);

  return {
    message: 'Login with Google successful',
    accessToken: token,
  };
}
}
