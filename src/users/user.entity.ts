export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
  createdAt: Date;
}