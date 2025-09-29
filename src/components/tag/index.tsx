import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = {
  color: "green" | "black";
  className?: string;
};

const Tag = ({
  children,
  color = "green",
  className,
}: PropsWithChildren<Props>) => {
  return (
    <span
      className={classNames(
        "inline-flex text-[10px] xl:text-xs rounded-sm py-0.5 px-1 mb-3 w-fit uppercase",
        colors.get(color),
        className
      )}
    >
      {children}
    </span>
  );
};

const colors = new Map<Props["color"], string>([
  ["green", "bg-green text-white"],
  ["black", "bg-black text-white"],
]);

export default Tag;
