import { SignupForm } from "@/components/signup-form.jsx";

function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-start justify-center gap-6">
      <div className="w-full max-w-sm mt-12 sm:mt-6">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
