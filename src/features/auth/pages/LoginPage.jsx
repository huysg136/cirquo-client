import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { AuthBrand } from "@/features/auth/components/AuthBrand";
import { LoginHero } from "@/features/auth/components/LoginHero";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";

export function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const status = useAuthStore((state) => state.status);
  const error = useAuthStore((state) => state.error);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login(credentials, rememberMe);
    } catch {
      // The Zustand store already exposes a user-facing error message.
    }
  }

  function updateField(event) {
    setCredentials((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-indigo-950/10 lg:min-h-[760px] lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex px-6 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-14">
          <div className="mx-auto flex w-full max-w-md flex-col">
            <AuthBrand />
            <div className="my-auto py-12 lg:py-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                <span className="size-1.5 rounded-full bg-indigo-600" />
                Secure access
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Welcome back.
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-500">
                Sign in to browse technology you love and keep track of every
                Cirquo order.
              </p>

              <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Email address
                  </span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="pl-11"
                      value={credentials.email}
                      onChange={updateField}
                      required
                    />
                  </span>
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="pl-11 pr-11"
                      value={credentials.password}
                      onChange={updateField}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-slate-700"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </span>
                </label>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                    />
                    Remember me
                  </label>
                  <a
                    className="font-semibold text-indigo-700 hover:text-indigo-900"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </a>
                </div>
                {error && (
                  <p
                    role="alert"
                    className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
                  >
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </div>
            <p className="text-center text-sm text-slate-500">
              New to Cirquo?{" "}
              <a
                className="font-semibold text-indigo-700 hover:text-indigo-900"
                href="/register"
              >
                Create an account
              </a>
            </p>
          </div>
        </section>
        <LoginHero />
      </div>
    </main>
  );
}
