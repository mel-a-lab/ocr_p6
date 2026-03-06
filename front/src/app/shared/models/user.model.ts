export interface UserResponseDTO {
  id: number;
  email: string;
  username: string;
  subscriptions: string[];  // Set<String> → string[]
}

export interface UserRequestDTO {
  email: string;
  username: string;
  password: string;
}
