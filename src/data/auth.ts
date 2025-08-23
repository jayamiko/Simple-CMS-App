export interface User {
  fullname: string;
  email: string;
  password: string;
}

export const users: User[] = [
  {
    fullname: "Jaya Miko",
    email: "user1@gmail.com",
    password: "user123",
  },
  {
    fullname: "Admin",
    email: "admin123@gmail.com",
    password: "admin123",
  },
];
