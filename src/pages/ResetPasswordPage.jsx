import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { resetPassword } from "../services/auth.service.js";

// UI Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Lock,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

export default function ResetPasswordPage() {
  const { token: resetPasswordToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setStatus("error");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const res = await resetPassword({ resetPasswordToken, password });

      if (res) {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");

      setError(err.response?.data?.message || "Unable to reset your password.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-start justify-center bg-muted/40">
        <Card className="w-full max-w-sm mt-12 sm:mt-6">
          <CardHeader className="space-y-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>

            <div>
              <CardTitle className="text-3xl">Password Updated</CardTitle>

              <CardDescription className="mt-2 text-base">
                Your password has been reset successfully.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-muted-foreground leading-7">
              You can now sign in using your new password.
            </p>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full py-5.5"
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
    <div className="min-h-[calc(100vh-64px)] flex items-start justify-center bg-muted/40">
      <Card className="w-full max-w-sm mt-12 sm:mt-6">
        <CardHeader className="space-y-5 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Lock className="h-10 w-10 text-blue-600" />
          </div>

          <div>
            <CardTitle className="text-3xl">Reset Password</CardTitle>

            <CardDescription className="mt-2 text-base">
              Create a new password for your account.
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
              <Label htmlFor="password">New Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-5"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="py-5"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Your password should be at least 8 characters long and include a
              combination of uppercase and lowercase letters, numbers, and
              special characters.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full py-5.5"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full py-5.5"
              onClick={() => navigate("/login")}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
