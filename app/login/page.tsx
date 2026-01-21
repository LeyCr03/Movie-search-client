"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { registerUser } from "@/actions/auth";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { Copyright, Github } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (mode === "signup") {
      const res = await registerUser(formData);
      if (res.error) setError(res.error);
      else {
        setMsg(res.success!);
        setMode("login");
      }
    } else {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: true,
        callbackUrl: "/",
      });
    }
  };

  return (
    <section className="">
      <div className="flex h-[80vh] flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-muted-foreground">CINESPHERE.</h1>
            <p className="text-foreground text-sm mt-2">
              {mode === "login" ? "Welcome back." : "Create your account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <Input name="name" placeholder="Full Name" required className="border border-border h-12 rounded-md" />
            )}
            <Input name="email" type="email" placeholder="Email" required className="border border-border h-12 rounded-md" />
            <Input name="password" type="password" placeholder="Password" required className="border border-border h-12 rounded-md" />

            {error && <p className="text-xs text-red-500">{error}</p>}
            {msg && <p className="text-xs text-green-500">{msg}</p>}

            <Button type="submit" className="w-full h-12 rounded-full ">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="relative">
            <div className="relative flex justify-center text-xs uppercase"><span className=" px-2 text-foreground">Or continue with</span></div>
          </div>

          <Button
            className="w-full h-12 rounded-full border-border"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>

          <p className="text-center text-xs uppercase text-muted-foreground">
            {mode === "login" ? "Don't have an account?  " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-foreground hover:underline"
            >
              {mode === "login" ? " SIGN UP" : " LOGIN"}
            </button>
          </p>
        </div>
      </div>
      <footer className="mt-10 flex justify-center items-center gap-2 text-muted-foreground">
        <Copyright size={25} />
        <h2>Copyright by <span className="font-bold">CINESPHERE.</span> All rights reserved</h2>
      </footer>
    </section>

  );
}
