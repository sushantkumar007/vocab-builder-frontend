import { useNavigate } from "react-router";

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
import { AlertTriangle } from "lucide-react";

export default function EmailVerificationFailed() {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-sm mt-12 sm:mt-6">
      <CardHeader className="text-center space-y-5">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>

        <div className="space-y-2">
          <CardTitle className="text-3xl">Verification Failed</CardTitle>

          <CardDescription className="text-base leading-7">
            We couldn't verify your email address.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground leading-7">
          The verification link is invalid, has expired, or has already been
          used.
        </p>

        <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
          You can request a new verification email and try again.
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          className="w-full py-5.5 cursor-pointer"
          onClick={() => navigate("/verify-email/request")}
        >
          Resend Verification Email
        </Button>
        <Button
          variant="outline"
          className="w-full py-5.5 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  );
}
