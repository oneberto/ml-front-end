import { IconFavorite } from "@/components/icons/favorite";
import { IconStar } from "@/components/icons/star";
import { IconVerified } from "@/components/icons/verified";
import Tag from "@/components/tag";
import { Product, ProductSeller } from "@/types";
import { generateArray } from "@/utils";
import classNames from "classnames";
import Price from "./price";

export type MainInformationProps = Pick<
  Product,
  "condition" | "sales" | "title" | "rating" | "variations" | "id"
> & {
  seller: ProductSeller;
};

const MainInformation = ({
  seller,
  condition,
  sales,
  title,
  rating,
  variations,
  id,
}: MainInformationProps) => {
  /**
   * @todo split this component!
   */

  return (
    <div className="xl:w-[340px] flex flex-col xl:mb-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-black/5 w-[24px] h-[24px] flex items-center">
          <img
            src={seller.thumb}
            alt={seller.title}
            width="100%"
            height="auto"
            className="rounded-sm"
          />
        </div>

        <p className="inline-flex items-center">
          <span className="text-sm text-blue-primary mr-1">
            Acesse a Loja {seller?.isOfficial && "Oficial"} de {seller?.title}
          </span>
          {seller?.isOfficial && <IconVerified width={14} height={14} />}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray">
          {condition} | +{sales} vendidos
        </p>

        <button className="text-blue-primary" type="button">
          <IconFavorite width={24} height={24} />
        </button>
      </div>

      {seller?.isOfficial && (
        <Tag color="black">LOJA OFICIAL {seller.title}</Tag>
      )}

      <h1
        data-testid="title"
        className="text-lg xl:text-2xl text-black/90 font-semibold mb-2"
      >
        {title}
      </h1>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray">{rating.average.toFixed(1)}</span>

        <div className="flex gap-0.5">
          {generateArray(5).map((i) => (
            <IconStar
              key={"star" + i}
              className={classNames(
                rating.average >= i + 1 ? "text-blue-primary" : "text-gray"
              )}
              width={16}
              height={16}
            />
          ))}
        </div>

        <span className="text-sm text-gray">({rating.total})</span>
      </div>

      <Price productId={id} />

      <div className="flex flex-col gap-1">
        {variations.map(({ label, value }) => (
          <p key={label} className="text-black/90">
            {label}: <span className="font-semibold">{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default MainInformation;
