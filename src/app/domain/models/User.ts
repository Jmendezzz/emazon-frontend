export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserRequestDTO{
  firstName: string;
  lastName: string;
  identityNumber: number;
  phoneNumber: string;
  birthDate: Date;
  email: string;
  password: string;
}
