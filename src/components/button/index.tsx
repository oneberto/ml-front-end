import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "regular" | "large";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = ({
  type = "button",
  className,
  variant = "primary",
  size = "regular",
  ...props
}: Props) => {
  return (
    <button
      type={type}
      className={classNames(
        "font-semibold disabled:bg-card-border",
        colors.get(variant),
        sizes.get(size),
        className
      )}
      {...props}
    ></button>
  );
};

const colors = new Map<ButtonVariant, string>([
  ["primary", "bg-blue-primary text-white hover:bg-blue-dark"],
  ["secondary", "bg-blue-secondary text-blue-primary"],
]);

const sizes = new Map<ButtonSize, string>([
  ["small", "rounded-sm text-xs h-[24px] px-2"],
  ["regular", "rounded-md text-sm h-[32px] px-3"],
  ["large", "rounded-md text-[15px] h-[48px] px-6"],
]);

export default Button;
