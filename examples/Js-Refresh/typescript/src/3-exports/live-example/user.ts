// user.ts - User module with named exports only

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export type UserRole = "admin" | "user" | "guest";

export const DEFAULT_ROLE: UserRole = "user";

export function createUser(
  username: string,
  email: string,
  role: UserRole = DEFAULT_ROLE
): User {
  return {
    id: Math.floor(Math.random() * 10000),
    username,
    email,
    role,
  };
}

export function isAdmin(user: User): boolean {
  return user.role === "admin";
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
