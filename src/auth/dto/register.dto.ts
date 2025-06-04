import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(1, { message: 'Age must be at least 1' })
  @Max(120, { message: 'Age must not exceed 120' })
  age?: number;
}