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
    <div className="relative">
      <input
        className="w-full border-b border-black bg-white text-xl focus:outline-none"
        {...props}
        type={showPassword ? "text" : "password"}
      />
      {showPassword ? (
        <Eye
          className="absolute right-0 top-0 mr-2"
          size={24}
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <EyeClosed
          className="absolute right-0 top-0 mr-2"
          size={24}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
}
