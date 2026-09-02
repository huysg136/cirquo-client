import heroImage from "@/features/auth/assets/login-tech-hero.png";

export function LoginHero() {
  return (
    <aside className="relative hidden overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-800 via-indigo-600 to-cyan-400 p-8 lg:flex lg:min-h-[720px] lg:flex-col">
      <div className="absolute -right-24 -top-20 size-72 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-violet-300/30 blur-2xl" />
      <div className="relative z-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100">
          Cirquo technology store
        </p>
        <h2 className="mt-4 max-w-sm text-4xl font-bold leading-tight text-white">
          Everything tech. One seamless place.
        </h2>
        <p className="mt-4 max-w-md text-base leading-7 text-indigo-100">
          Discover your next device, manage orders, and shop smarter with
          Cirquo.
        </p>
      </div>
      <img
        className="relative z-10 mx-auto mt-auto w-full max-w-[560px] object-contain drop-shadow-2xl"
        src={heroImage}
        alt="A customer exploring Cirquo technology products"
      />
    </aside>
  );
}
