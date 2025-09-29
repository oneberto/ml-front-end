import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
  "data-testid": string;
};
const SidebarCard = ({
  children,
  className,
  ...rest
}: PropsWithChildren<Props>) => (
  <div
    className={classNames(
      "xl:border xl:border-card-border xl:px-4 xl:rounded-lg",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export default SidebarCard;
