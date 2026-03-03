import type { RouteObject } from "react-router-dom";
import Login from "../Login";
import Signup from "../Signup";
import ForgotPassword from "../ForgotPassword";
import VerifyOtp from "../VerifyOtp";
import ResetPassword from "../ResetPassword";

const authRoutes: RouteObject[] = [
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "verify-otp", element: <VerifyOtp /> },
  { path: "reset-password", element: <ResetPassword /> },
];

export default authRoutes;
