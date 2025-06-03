import { IsString, IsEmail, IsOptional, Matches, IsNumber, IsNotEmpty, MinLength, Min, Max } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' })
    name?: string;
    
    @IsNotEmpty({ message: 'Email is required'})
    @IsEmail({}, { message: 'Please fill a valid email address' })
    email?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Age must be a number' })
    @Min(1, { message: 'Age must be at least 1' })
    @Max(120, { message: 'Age must not exceed 120' })
    age?: number;
}