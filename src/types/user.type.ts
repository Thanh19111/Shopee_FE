export interface User {
  _id: string;
  role: Role[];
  email: string;
  name?: string;
  date_of_birth?: string;
  avatar?: string;
  address?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

type Role = 'User' | 'Admin'