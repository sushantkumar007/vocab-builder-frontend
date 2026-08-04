import { useState } from "react";
import { useNavigate } from "react-router";
import { resetPassordRequest } from "../services/auth.service.js";

// UI Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, MailCheck, Loader2, AlertTriangle } from "lucide-react";

export default function ResetPasswordRequestPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setError("");

    try {
      const res = await resetPassordRequest({ email });
      if (res) {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");

      setError(
        err.response?.data?.message || "Unable to send password reset email.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-start justify-center bg-muted/40">
        <Card className="w-full max-w-sm mt-12 sm:mt-6">
          <CardHeader className="space-y-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <MailCheck className="h-10 w-10 text-green-600" />
            </div>

            <div>
              <CardTitle className="text-3xl">Check Your Email</CardTitle>

              <CardDescription className="mt-2 text-base">
                If an account is associated with this email address, we've sent
                a password reset link.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 text-center">
            <p className="font-medium break-all">{email}</p>

            <p className="text-muted-foreground">
              Open the email and follow the instructions to reset your password.
            </p>

            <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
              If you don't receive an email within a few minutes, check your
              spam or junk folder.
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full py-5.5 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-start justify-center bg-muted/40">
      <Card className="w-full max-w-sm mt-12 sm:mt-6">
        <CardHeader className="space-y-5 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <KeyRound className="h-10 w-10 text-blue-600" />
          </div>

          <div>
            <CardTitle className="text-3xl">Forgot Password</CardTitle>

            <CardDescription className="mt-2 text-base">
              Enter your email address and we'll send you a link to reset your
              password.
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {status === "error" && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-5"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 mt-6">
            <Button
              type="submit"
              className="w-full py-5.5 cursor-pointer"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full py-5.5 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
