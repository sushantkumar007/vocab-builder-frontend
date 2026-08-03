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
import { BadgeCheck } from "lucide-react";

export default function EmailVerificationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-start justify-center bg-muted/40 mt-12 p-6 md:p-10">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center space-y-5">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <BadgeCheck className="h-10 w-10 text-green-600" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl">Email Verified</CardTitle>

            <CardDescription className="text-base leading-7">
              Your email address has been verified successfully.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground leading-7">
            Your account is now fully activated. You can sign in and start using
            VocBank.
          </p>

          <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
            ✔ Your account has been verified successfully.
            <br />✔ You now have full access to all features.
          </div>
        </CardContent>

        <CardFooter className="w-full flex gap-3">
          <Button
            className="w-full py-5 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Continue to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
