import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
@UseGuards(ThrottlerGuard) // Required for throttling to work
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Strict rate limiting for user creation (3 requests per minute)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  // Protected endpoint - no additional throttling needed as it's behind auth
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  // Public read endpoint with moderate throttling (10 requests per minute)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  // Individual user lookup with moderate throttling
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.usersService.findOne(+id);
  }

  // Update operations with limited throttling (5 requests per minute)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User | null {
    return this.usersService.update(+id, updateUserDto);
  }

  // Delete operations with strict throttling (2 requests per minute)
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string): User[] | null {
    return this.usersService.remove(+id);
  }

  // Example: Skip throttling entirely for a specific endpoint
  @SkipThrottle()
  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }
}