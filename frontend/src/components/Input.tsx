import { InputHTMLAttributes, useState } from "react";
import { Eye, EyeClosed } from "phosphor-react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  passWordInput?: boolean;
}

export function Input({ label, passWordInput, ...props }: inputProps) {
  if (passWordInput) {
    return <PasswordInput {...props} />;
  }

  return (
    <>
      <input
        className="w-full border-b border-black bg-white text-xl focus:outline-none"
        {...props}
      />
    </>
  );
}

function PasswordInput({ label, ...props }: inputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex">
      <input
        className="w-full border-b border-black bg-white pr-1 text-xl leading-3 focus:outline-none"
        {...props}
        type={showPassword ? "text" : "password"}
      />
      {showPassword ? (
        <Eye
          size={30}
          onClick={() => setShowPassword(!showPassword)}
          className="border-b border-black pr-2"
        />
      ) : (
        <EyeClosed
          size={30}
          onClick={() => setShowPassword(!showPassword)}
          className="border-b border-black pr-2"
        />
      )}
    </div>
  );
}
