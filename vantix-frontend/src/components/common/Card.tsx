import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "border select-none relative transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-obsidian-muted/50 border-system-border/60 hover:border-system-border",
        elevated: "bg-obsidian-muted/80 border-system-border rounded-md shadow-high backdrop-blur-command",
        gradient: "bg-gradient-to-r from-obsidian-muted to-obsidian border-system-border rounded-md",
        aiGlow: "bg-obsidian-muted border-system-border/85 rounded-md shadow-ai-glow",
        alertGlow: "bg-system-crimson/[0.04] border-system-crimson rounded-md shadow-alert-glow animate-strobe",
      },
      padding: {
        none: "",
        sm: "p-sm",
        md: "p-md",
        lg: "p-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card: React.FC<CardProps> = ({
  className,
  variant,
  padding,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';
export default Card;
