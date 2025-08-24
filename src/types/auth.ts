import { User } from "./user";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

export type LoginPayload = {
  email: string;
  password: string;
};
