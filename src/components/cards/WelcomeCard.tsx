type WelcomeCardProps = {
  name: string;
};

export function WelcomeCard({ name }: WelcomeCardProps) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">
            Selamat datang{name ? `, ${name}` : "!"}
          </h1>
          <p className="mt-2 text-gray-600">
            Ini adalah halaman landing setelah login. Anda bisa memulai dari
            menu di atas atau lanjutkan aktivitas terakhir Anda.
          </p>
        </div>
      </div>
    </section>
  );
}
