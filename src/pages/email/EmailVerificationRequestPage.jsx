import { useState } from "react";
import { useNavigate } from "react-router";
import { resendEmailVerification } from "../../services/auth.service.js";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, MailCheck, Loader2, AlertTriangle } from "lucide-react";

export default function EmailVerificationRequestPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  // idle | loading | success | error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setError("");

    try {
      const res = await resendEmailVerification({ email });
      if (res) {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setError(
        err.response?.data?.message ||
          "Unable to send verification email. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex justify-center bg-muted/40 mt-16 sm:mt-8 p-6 md:p-10">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-5">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <MailCheck className="h-10 w-10 text-green-600" />
            </div>

            <div className="space-y-2">
              <CardTitle className="text-3xl">
                Verification Email Sent
              </CardTitle>

              <CardDescription className="text-base leading-7">
                We've sent a new verification email.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 text-center">
            <p className="text-muted-foreground leading-7">
              A verification email has been sent to
            </p>

            <p className="font-medium break-all">{email}</p>

            <p className="text-muted-foreground leading-7">
              Please open your inbox and click the verification link to activate
              your account.
            </p>

            <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
              Can't find the email? Check your spam or junk folder.
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full py-5.5 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Continue to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-muted/40 mt-12 sm:mt-8 p-6 md:p-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-5">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-10 w-10 text-blue-600" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl">
              Resend Verification Email
            </CardTitle>

            <CardDescription className="text-base leading-7">
              Enter the email address associated with your account and we'll
              send you a new verification email.
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {status === "error" && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="w-full py-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <p className="text-sm text-muted-foreground text-center">
              We'll send a new verification link if your account exists and has
              not yet been verified.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
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
                "Send Verification Email"
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
