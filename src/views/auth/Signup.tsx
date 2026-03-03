import { Link } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import {
  InputComponent,
  PasswordComponent,
} from "../../components/ui/InputComponent";
import ButtonComponent from "../../components/ui/ButtonComponent";

const Signup = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start your journey with HireFlow today."
    >
      <div className="flex flex-col gap-5 text-white/80">
        <div className="flex gap-4">
          <InputComponent label="First Name" placeholder="John" />
          <InputComponent label="Last Name" placeholder="Doe" />
        </div>
        <InputComponent
          label="Email"
          placeholder="john@example.com"
          type="email"
        />
        <InputComponent label="Phone Number" placeholder="+1 234 567 890" />
        <PasswordComponent label="Password" placeholder="Min. 8 characters" />
        <PasswordComponent
          label="Confirm Password"
          placeholder="Re-enter password"
        />
        <ButtonComponent label="Sign Up" block />
        <p className="text-dark-gray text-sm text-center">
          Already have an account?{" "}
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

export default Signup;
