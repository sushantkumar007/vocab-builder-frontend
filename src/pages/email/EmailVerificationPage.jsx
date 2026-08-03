import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { verifyEmail } from "../../services/auth.service.js";

// UI Components
import EmailVerificationSuccess from "@/components/EmailVerificationSuccess.jsx";
import EmailVerificationFailed from "@/components/EmailVerificationFailed.jsx";
import PageLoader from "@/components/PageLoader.jsx";

export default function EmailVerificationPage() {
  const { token: emailVerificationToken } = useParams();
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const handleEmailVerification = async (token) => {
      try {
        const res = await verifyEmail(token);
        if (res) {
          setIsEmailVerified(true);
        }
      } catch (error) {
        console.error("Error verifying email:", error.message);
      } finally {
        setLoading(false);
      }
    };

    handleEmailVerification(emailVerificationToken);
  }, [emailVerificationToken]);

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-start justify-center bg-muted/40">
      {loading && <PageLoader />}
      {!loading && isEmailVerified && <EmailVerificationSuccess />}
      {!loading && !isEmailVerified && <EmailVerificationFailed />}
    </section>
  );
}
