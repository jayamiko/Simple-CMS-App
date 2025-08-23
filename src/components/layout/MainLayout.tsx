import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto grid max-w-5xl gap-8 p-6 py-10">{children}</main>
    </div>
  );
}
