import { Select } from "antd";
import type { SelectProps } from "antd";

interface SelectComponentProps extends SelectProps {
  label?: string;
  containerClassName?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName ?? ""}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select className={className} {...props} />
    </div>
  );
};

export default SelectComponent;
