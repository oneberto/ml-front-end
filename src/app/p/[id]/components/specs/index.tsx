import { Product } from "@/types";

type Props = {
  specs: Product["specs"];
};

const Specs = ({ specs }: Props) => {
  return (
    <div>
      <h2 className="text-2xl text-black/90 mb-7">
        Características do produto
      </h2>

      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2 xl:gap-y-6">
        {specs.map(({ title, value, icon }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="bg-black/5 rounded-full">
              <img src={icon} alt={title} width={32} height={32} />
            </div>

            <p className="text-sm text-black/90">
              {title}: <span className="font-semibold">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specs;
