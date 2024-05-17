import { InputProps } from "@nextui-org/react";

const VerifyInput: React.FC<InputProps> = ({
  placeholder,
  className,
  type,
  name,
  value,
  required = true,
  onChange,
}) => {
  return (
    <input
      className={`  text-xl text-black-100 h-14 rounded-xl border-2 px-3 placeholder:text-xl bg-transparent placeholder:text-slate-300 outline-none border-gray-400 ${className}`}
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      required={required}
    />
  );
};

export default VerifyInput;
