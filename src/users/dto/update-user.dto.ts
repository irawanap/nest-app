import { IsString, IsOptional, MinLength, Matches, IsEmail, IsNumber, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @Matches(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(1, { message: 'Age must be at least 1' })
  @Max(120, { message: 'Age must not exceed 120' })
  age?: number;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password?: string;
}
