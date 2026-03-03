import { Link } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import { InputComponent } from "../../components/ui/InputComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";

const VerifyOtp = () => {
  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the 6-digit code sent to your email."
    >
      <div className="flex flex-col gap-5 text-white/80">
        <InputComponent
          label="OTP Code"
          placeholder="Enter 6-digit code"
          maxLength={6}
        />
        <ButtonComponent label="Verify" block />
        <p className="text-dark-gray text-sm text-center">
          Didn't receive the code?{" "}
          <span className="text-auth-green font-medium cursor-pointer hover:underline">
            Resend OTP
          </span>
        </p>
        <p className="text-dark-gray text-sm text-center">
          <Link
            to="/auth/login"
            className="text-auth-green font-medium hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
