import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: Date.now(),
      name: createUserDto.name,
      email: createUserDto.email,
      age: createUserDto.age,
      password: createUserDto.password,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }


  update(id: number, updateUserDto: UpdateUserDto): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
      return this.users[userIndex];
    }
    return null;
  }

  remove(id: number): User[] | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      return this.users.splice(userIndex, 1);
    }
    return null;
  }
}