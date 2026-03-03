import type { ComponentProps } from "react";
import { Input } from "antd";
import type { InputProps } from "antd";

type PasswordProps = ComponentProps<typeof Input.Password>;

interface InputComponentProps extends InputProps {
  label?: string;
  containerClassName?: string;
}

interface PasswordComponentProps extends PasswordProps {
  label?: string;
  containerClassName?: string;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName ?? ""}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input className={className} {...props} />
    </div>
  );
};

export const PasswordComponent: React.FC<PasswordComponentProps> = ({
  label,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName ?? ""}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input.Password className={className} {...props} />
    </div>
  );
};
