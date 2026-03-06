// src/app/models/theme.model.ts (Updated Interface)
export interface ThemeResponseDTO {
  id: number;
  name: string;
  description: string;
  subscribersCount: number;
  subscribed: boolean;   // NEW: From backend
}

export interface ThemeRequestDTO {
  name: string;
  description: string;
}
