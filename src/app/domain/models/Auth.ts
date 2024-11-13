export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface SignupRequestDTO {
    firstName: string;
    lastName: string;
    identityNumber: string;
    phoneNumber: string;
    birthDate: Date;
    email: string;
    password: string;
}

export interface AuthReponseDTO {
  token: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  WAREHOUSE_ASSISTANT = 'WAREHOUSE_ASSISTANT',
}

export interface UserDetails {
  id: number;
  role: Role;
}
