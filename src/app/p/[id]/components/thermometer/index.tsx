import classNames from "classnames";

type Props = {
  score: number;
};

const Thermometer = ({ score }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-1 mb-3">
      {colors.map((color, index) => (
        <div
          key={color}
          className={classNames(
            "block w-full h-1.5",
            index === score ? colors[index] : colors[index] + "/15"
          )}
        />
      ))}
    </div>
  );
};

const colors = [
  "bg-[#f23d4f]",
  "bg-[#f73]",
  "bg-[#ffe600]",
  "bg-[#aadb1e]",
  "bg-green",
];

export default Thermometer;
