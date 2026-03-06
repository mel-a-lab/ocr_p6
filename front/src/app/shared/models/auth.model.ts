import { UserResponseDTO } from './user.model';

export interface LoginRequestDTO {
  usernameOrEmail: string;
  password: string;
}
export interface RegisterRequestDTO {
  username: string;
  email: string;
  password: string;
}
export interface AuthResponseDTO {
  token: string;
  user: UserResponseDTO;
}
