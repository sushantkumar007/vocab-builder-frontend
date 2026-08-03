import { Navigate, useLocation, useNavigate } from "react-router";

// UI Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail } from "lucide-react";

export default function EmailVerificationNoticePage() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state?.fromSignup) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-muted mt-12 sm:mt-0 p-6 md:p-10">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center space-y-5">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl">Verify your email</CardTitle>

            <CardDescription className="text-base leading-7">
              Your account has been created successfully. hello
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-7 w-7 text-primary" />
          </div>

          <div className="space-y-4 px-6">
            <p className="text-muted-foreground leading-7">
              We've sent a verification email to the email address you provided.
            </p>

            <p className="text-muted-foreground leading-7">
              Please check your inbox and click the verification link to
              activate your account before logging in.
            </p>

            <p className="text-sm text-muted-foreground">
              Can't find the email? Be sure to check your spam or junk folder.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-4">
          <Button
            className="w-full py-5.5 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Continue to Login
          </Button>

          <Button
            variant="outline"
            className="w-full py-5.5 cursor-pointer"
            onClick={() => navigate("/verify-email/request")}
          >
            Resend Verification Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
