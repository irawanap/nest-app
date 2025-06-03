import { IsString, IsNotEmpty, Matches, IsEmail, IsNumber, MinLength, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required and cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @Matches(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' })
  name: string;

  @IsNotEmpty({ message: 'Email is required and cannot be empty' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNumber({}, { message: 'Age must be a number' })
  @Min(1, { message: 'Age must be at least 1' })
  @Max(120, { message: 'Age must not exceed 120' })
  age: number;
}
