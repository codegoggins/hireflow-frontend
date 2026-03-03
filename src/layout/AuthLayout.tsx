import type { ReactNode } from "react";
import Logo from "../components/shared/Logo";
import { ImQuotesLeft } from "react-icons/im";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="flex min-h-screen bg-main-black">
      <div className="flex-1 flex flex-col px-10 pt-8">
        <Logo className="text-white mb-auto" />
        <div className="w-full max-w-[420px] mx-auto mb-auto">
          <h1 className="text-white text-3xl font-bold mb-2">{title}</h1>
          {subtitle && (
            <p className="text-dark-gray text-sm mb-8">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center p-6">
        <div className="w-full h-full bg-auth-green rounded-3xl flex flex-col items-center justify-between p-6">
          <div className="flex flex-col gap-8">
            <h1 className="text-white text-[2rem] font-semibold leading-snug">
              Trusted by teams who hire with confidence
            </h1>
            <ImQuotesLeft size={50} className="text-white mb-2" />
            <p className="text-white/90 leading-relaxed">
              HireFlow replaced our messy spreadsheets and endless email threads
              with a single, streamlined pipeline. Our time-to-hire dropped by
              40%, and the interview queue keeps everyone aligned without the
              back-and-forth. It's been a game-changer for our HR team.
            </p>
          </div>
          <div className="bg-white w-full p-8 flex flex-col gap-5 items-start justify-center rounded-2xl">
            <h1 className="font-semibold text-[1.6rem] text-black max-w-100 text-left leading-snug">
              Your recruitment pipeline, finally in one place
            </h1>
            <p className="text-black/75 text-left leading-relaxed">
              Schedule interviews, manage candidate queues, and collect feedback
              — all from one dashboard. Built for modern teams that want to hire
              the right people, faster and without the chaos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
