"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentProps, Fragment, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]{8,}$/;

    if (!emailPattern.test(email)) {
      toast.error("Invalid email format", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    if (!passwordPattern.test(password)) {
      toast.error("Invalid password format", {
        description:
          "Password must be at least 8 characters long and contain at least one letter and one number.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please ensure both password fields match.",
      });
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to sign up");
        return;
      }

      const data = await response.json();
      toast.success("Signup successful! Please log in.", {
        action: {
          label: "Login now",
          onClick: () => {
            window.location.href = "/login"; // Redirect to login page
          },
        },
      });
      // Redirect to login page or perform any other action
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign up with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Fragment>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("google");
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full cursor-pointer"
                  >
                    Create Account
                  </Button>
                </div>
              </>
              <div className="text-center text-sm">
                If you have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </Fragment>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </div>
    </div>
  );
}
