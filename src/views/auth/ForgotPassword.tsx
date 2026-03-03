import { Link } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import { InputComponent } from "../../components/ui/InputComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you an OTP to reset it."
    >
      <div className="flex flex-col gap-5 text-white/80">
        <InputComponent
          label="Email"
          placeholder="john@example.com"
          type="email"
        />
        <ButtonComponent label="Send OTP" block />
        <p className="text-dark-gray text-sm text-center">
          Remember your password?{" "}
          <Link
            to="/auth/login"
            className="text-auth-green font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
