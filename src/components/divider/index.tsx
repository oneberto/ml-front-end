import classNames from "classnames";

type Props = {
  className?: string;
};

const Divider = ({ className }: Props) => {
  return (
    <div
      className={classNames("block w-full h-[1px] bg-black/10 my-8", className)}
    />
  );
};

export default Divider;
