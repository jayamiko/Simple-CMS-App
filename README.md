# Next.js CMS App

This is a [Next.js](https://nextjs.org) project bootstrapped [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
It is a simple CMS demo application with authentication, state management, and persistence features.

---

## 🚀 Getting Started

### How to run the project

#### 1. Install dependencies

Run one of the following commands before starting the project:

```
yarn install
# or
npm install
```

#### 2. Start the development server

```
yarn dev
# or
npm run dev
# or
pnpm dev
# or
bun dev
```

#### 3. Open your browser

Go to [http://localhost:3000](http://localhost:3000)
to see the app running locally.

## 🔑 Dummy Authentication

Use the following accounts to log in:

| Email             | Password  |
| ----------------- | --------- |
| `user1@gmail.com` | `user123` |
| `user2@gmail.com` | `user123` |
| `user3@gmail.com` | `user123` |

## 🌐 Demo

If you don’t want to run the project locally, you can try the live demo:
👉 [https://simple-cms-app-znzy.vercel.app/](https://simple-cms-app-znzy.vercel.app/)

The project is deployed via [vercel](https://vercel.com/font).

## ✨ Features Implemented

- ✅ Styling with **TailwindCSS** (Utility-first CSS framework)

- ✅ State Management with Redux – used to handle authentication and global state.

- ✅ Form Validation with React Hook Form – for handling login and other forms with validation.

- ✅ Persistence with localStorage – user session and data are saved to localStorage to survive reloads.

- ✅ Logout Flow – users can log out, which clears the persisted session.

- ✅ TypeScript – the project is written in TypeScript for type safety and better developer experience.

## 📝 Notes & Assumptions

- This project is a demo CMS app, intended for educational purposes, not production-ready.

- Authentication is dummy-based (static users in the table above). No backend or secure hashing is implemented.

- The app assumes the browser supports localStorage (commonly available in modern browsers).

- Data persistence is kept simple for demonstration purposes (stored locally, not synced with a real database).

- For production usage, a proper backend with secure auth (JWT, OAuth, etc.) should be implemented.
