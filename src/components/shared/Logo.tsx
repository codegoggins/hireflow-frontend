import { LuWorkflow } from "react-icons/lu";

interface LogoProps {
  className?: string;
  iconSize?: number;
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  iconSize = 22,
  textClassName = "text-xl",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LuWorkflow size={iconSize} />
      <span className={`font-bold tracking-tight ${textClassName}`}>
        hireflow
      </span>
    </div>
  );
};

export default Logo;
