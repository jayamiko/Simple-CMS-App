type WelcomeCardProps = {
  name: string;
  description: string;
};

export function WelcomeCard({ name, description }: WelcomeCardProps) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border shadow-sm border-t-4 border-cyan-700 p-6 md:p-8 lg:p-10">
          <h1 className="text-2xl font-semibold">
            Welcome{name ? `, ${name}` : "!"}
          </h1>
          <p className="mt-2">{description}</p>
        </div>
      </div>
    </section>
  );
}
