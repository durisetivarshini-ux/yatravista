import React from "react";
import { Link } from "react-router-dom";

export function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 shadow-soft",
  };

  const variantStyles = {
    primary: "bg-theme-primary text-white hover:bg-theme-primary-hover shadow-soft",
    secondary: "bg-theme-card text-theme-text border border-theme-border hover:bg-theme-bg shadow-sm",
    outline: "border border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white",
    accent: "bg-theme-accent text-white hover:opacity-95 shadow-soft",
    ghost: "text-theme-text-muted hover:text-theme-text hover:bg-theme-border/30",
    danger: "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100",
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      {...props}
    >
      {content}
    </button>
  );
}
