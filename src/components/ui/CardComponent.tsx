import type { CSSProperties, ReactNode } from "react";

interface CardComponentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  padding?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  children,
  className = "",
  style,
  padding = "p-5",
}) => {
  return (
    <div
      className={`w-full rounded-xl border border-white/10 bg-white/[0.03] ${padding} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default CardComponent;
