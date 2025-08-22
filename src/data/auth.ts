export interface User {
  email: string;
  password: string;
}

export const users: User[] = [
  {
    email: "user123@gmail.com",
    password: "user123",
  },
  {
    email: "admin123@gmail.com",
    password: "admin123",
  },
];
