import { SignupForm } from "@/components/signup-form.jsx";

function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-start justify-center gap-6 bg-muted mt-12 sm:mt-0 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
