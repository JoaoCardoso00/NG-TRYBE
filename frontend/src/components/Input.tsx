import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Eye, EyeClosed } from "phosphor-react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef(({ label, ...props }: inputProps, ref) => {
  return (
    <div className="text-left">
      {label && <label className="text-brand-gray-800">{label}</label>}
      <input
        className="w-full border-b border-black bg-white text-xl focus:outline-none"
        {...props}
        ref={ref as any}
      />
    </div>
  );
});

export const PasswordInput = forwardRef(
  ({ label, ...props }: inputProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex">
        <input
          className="w-full border-b border-black bg-white pr-1 text-xl leading-3 focus:outline-none"
          {...props}
          type={showPassword ? "text" : "password"}
          ref={ref as any}
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
);
