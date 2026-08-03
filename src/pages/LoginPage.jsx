import { LoginForm } from "@/components/login-form.jsx";

function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-start justify-center">
      <div className="w-full max-w-sm mt-12 sm:mt-6">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
