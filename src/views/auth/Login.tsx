import { Link } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import {
  InputComponent,
  PasswordComponent,
} from "../../components/ui/InputComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";

const Login = () => {
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue to HireFlow.">
      <div className="flex flex-col gap-5 text-white/80">
        <InputComponent
          label="Email"
          placeholder="john@example.com"
          type="email"
        />
        <PasswordComponent label="Password" placeholder="Enter your password" />
        <div className="flex justify-end -mt-2">
          <Link
            to="/auth/forgot-password"
            className="text-auth-green text-xs font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <ButtonComponent label="Log In" />
        <p className="text-dark-gray text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-auth-green font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
