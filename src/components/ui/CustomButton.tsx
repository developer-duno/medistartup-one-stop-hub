
import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  asChild = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-pretendard font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const variantStyles = {
    primary: "bg-primary hover:bg-primary-700 text-white focus:ring-primary-300",
    secondary: "bg-secondary hover:bg-secondary-700 text-white focus:ring-secondary-300",
    accent: "bg-accent hover:bg-accent-700 text-white focus:ring-accent-300",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary-100 focus:ring-primary-300",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-5 py-2",
    lg: "text-lg px-6 py-3",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default CustomButton;
