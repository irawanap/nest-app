import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {
  // Cek apakah email sudah digunakan
  const existingEmail = this.users.find(user => user.email === createUserDto.email);
  if (existingEmail) {
    throw new ConflictException('Email already exists');
  }

  // Cek apakah ID sudah digunakan (jika kamu izinkan user menentukan ID secara manual)
  // Namun jika ID auto-increment seperti sebelumnya, pengecekan ini tidak dibutuhkan.

  const nextId = this.users.length > 0
    ? this.users[this.users.length - 1].id + 1
    : 1;

  const newUser: User = {
    id: nextId,
    ...createUserDto,
    createdAt: new Date(),
  };

  this.users.push(newUser);
  return newUser;
}


  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User | null {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
    };

    return this.users[index];
  }

  remove(id: number): User[] | null {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    this.users.splice(index, 1);
    return this.users;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}