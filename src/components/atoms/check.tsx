import React, { Dispatch, SetStateAction } from "react";

interface CheckProps {
  linkText?: string;
  text?: string;
  href?: React.MouseEventHandler<HTMLButtonElement>;
  required?: boolean;
  state?: boolean;
  setState?: Dispatch<SetStateAction<boolean>>;
}

const Check: React.FC<CheckProps> = ({
  linkText,
  text,
  href,
  required,
  state,
  setState,
}: CheckProps) => {
  const handleChange = () => {
    if (setState) {
      setState((prevState) => !prevState); // Invierte el estado actual
    }
  };

  return (
    <div className="flex justify-center gap-2 items-center">
      <label className="flex" htmlFor="checkbox">
        <input
          type="checkbox"
          placeholder="none"
          id="checkbox"
          className="w-6 h-6 rounded-full"
          required={required}
          checked={state}
          onChange={handleChange} // Manejar cambios en el estado de la casilla de verificación
        />
      </label>
      <div className="my-2 text-left">
        {text}
        <button
          onClick={href}
          type="button"
          className="text-xl underline underline-offset-2 text-gray-900"
        >
          {linkText}
        </button>
      </div>
    </div>
  );
};

export default Check;
