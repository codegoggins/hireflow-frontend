import { Link } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import { PasswordComponent } from "../../components/ui/InputComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";

const ResetPassword = () => {
  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your new password below."
    >
      <div className="flex flex-col gap-5 text-white/80">
        <PasswordComponent
          label="New Password"
          placeholder="Min. 8 characters"
        />
        <PasswordComponent
          label="Confirm Password"
          placeholder="Re-enter password"
        />
        <ButtonComponent label="Reset Password" block />
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

export default ResetPassword;
