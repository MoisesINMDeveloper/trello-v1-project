import { HTMLInputTypeAttribute } from "react";

const InputForm = ({
  className,
  type,
  name,
  value,
  placeholder,
  onChange,
}: {
  type: HTMLInputTypeAttribute;
  name: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className={`text-xl w-[80vw] h-12 border-2 border-gray-400 rounded-xl px-4 outline-none ${className}`}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
export default InputForm;
