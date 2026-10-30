import { forwardRef } from "react";

const variants = {
  primary: "bg-[#e08850] text-[#3a2020] hover:bg-[#d8793d]",
  secondary: "bg-[#ece6dc] text-[#3a302a] hover:bg-[#e2dbd0]",
  ghost: "bg-transparent text-[#605850] hover:bg-[#ece6dc]",
  danger: "bg-[#fce4e0] text-[#c0392b] hover:bg-[#f8d4ce]",
};

const Button = forwardRef(function Button(
  { children, variant = "primary", className = "", type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#c2652a]/40 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
