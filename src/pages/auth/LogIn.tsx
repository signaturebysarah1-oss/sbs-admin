import { supabase } from "@/lib/supabase";
import logo from "@/assets/images/sarah-logo.jpg";

const LogIn = () => {


  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  
    if (error) {
      console.error("Google login failed:", error.message);
    }
  };
  return (
    <div className="flex min-h-screen bg-[#FAFAF8]">
      {/* Left — brand panel */}
      <div className="relative hidden w-[52%] flex-col justify-between overflow-hidden bg-[#18120E] p-14 lg:flex">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Editorial photo */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=1200&fit=crop&auto=format&q=80"
            alt="Signature by Sarah editorial"
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#18120E] via-[#18120E]/40 to-transparent" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex rounded-sm h-10 w-10 items-center justify-center  bg-[#8B5E3C]">
             <img src={logo} className="rounded-sm"/>
            </div>

            <div>
              <p className="font-display text-base font-semibold leading-none text-white">
                Signature by Sarah
              </p>

              <p className="mt-0.5 text-xs tracking-wide text-[#C9A227]">
                Admin Portal
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <blockquote className="mb-6 font-display text-2xl font-medium leading-relaxed text-white">
            "Every shoe tells a story.
            <br />
            Every step, a signature."
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-[#8B5E3C]/40">
              <img
                src={logo}
                alt="Sarah"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-white">Sarah</p>

              <p className="text-xs text-[#C9A227]">
                Founder & Creative Director
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — login form */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B5E3C]">
            <span className="font-display text-sm font-bold text-white">
              SBS
            </span>
          </div>

          <div>
            <p className="font-display text-base font-semibold leading-none text-[#1C1917]">
              Signature by Sarah
            </p>

            <p className="mt-0.5 text-xs text-[#C9A227]">Admin Portal</p>
          </div>
        </div>

        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="mb-2 font-display text-[2rem] font-semibold leading-tight text-[#1C1917]">
              Welcome back
            </h1>

            <p className="text-sm leading-relaxed text-[#78716C]">
              Sign in to your admin dashboard to manage products, orders, and
              more.
            </p>
          </div>
          {/* Google button */}
          <button
            onClick={login}
            // disabled={loading}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#E7E2DC] bg-white text-sm font-medium text-[#1C1917] shadow-sm transition-all duration-150 hover:border-[#C9A227]/60 hover:bg-[#FFFDFB] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {/* {loading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-[#8B5E3C]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>

                <span className="text-[#78716C]">Signing you in…</span>
              </>
            ) : (
              <> */}
                {/* Google logo SVG */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />

                  <path
                    d="M12 23c2.97 0 2.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />

                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />

                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              {/* </> */}
            {/* )} */}
          </button>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E7E2DC]" />

            <span className="text-xs font-medium text-[#A8A29E]">
              Authorised access only
            </span>

            <div className="h-px flex-1 bg-[#E7E2DC]" />
          </div>

          {/* Fine print */}
          <p className="text-center text-xs leading-relaxed text-[#A8A29E]">
            Access is restricted to authorised SBS team members.
            <br />
            Unauthorised access attempts are logged.
          </p>
        </div>

        {/* Footer */}
        <p className="absolute bottom-6 text-[10px] text-[#C4BBAF]">
          © {new Date().getFullYear()} Signature by Sarah · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default LogIn;
