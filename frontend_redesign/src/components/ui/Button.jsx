// src/components/ui/Button.jsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/lib/utils"; // Убедитесь, что путь правильный

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "bg-transparent hover:bg-white/10 text-white",
        link: "text-primary underline-offset-4 hover:underline",
        "primary-red":
          "bg-primary-red hover:bg-secondary-red text-white shadow-[0px_5px_31px_rgba(222,71,60,0.15)]",
      },
      size: {
        sm: "h-10 w-10 text-xl",
        md: "px-[15px] py-[15px] text-sm",
        lg: "h-10 px-8 rounded-full text-base",
        icon: "h-8 w-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary-red", // Изменим стандартный вариант на наш красный
      size: "md",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };