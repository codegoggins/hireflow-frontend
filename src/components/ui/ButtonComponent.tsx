import { Button } from "antd";
import type { ButtonProps } from "antd";

interface ButtonComponentProps extends ButtonProps {
  label?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  className,
  children,
  ...props
}) => {
  return (
    <Button
      type="primary"
      className={`font-semibold ${className ?? ""}`}
      {...props}
    >
      {children || label}
    </Button>
  );
};

export default ButtonComponent;
