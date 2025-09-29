import { getProductPrices } from "@/services/requests";
import { formatCurrency } from "@/utils";
import Link from "next/link";

type Props = {
  productId: string;
};

const Price = async ({ productId }: Props) => {
  const { prices } = await getProductPrices(productId);

  const secondaryPrice = prices.find((item) => Boolean(item.isSecondary));

  const defaultPrice =
    prices.find((item) => Boolean(item.isDefault)) ||
    secondaryPrice ||
    prices[0];

  return (
    <div className="mb-4">
      <p className="line-through text-gray">
        {formatCurrency(defaultPrice.oldValue)}
      </p>

      <div className="flex items-end gap-2 mb-1">
        <p className="text-black/90 text-4xl">
          {formatCurrency(defaultPrice.amount)}
        </p>
        <p className="text-gray text-lg mb-0.5">
          no {defaultPrice.paymentMethod}
        </p>
      </div>

      <p className="text-gray text-base mb-2">
        ou {formatCurrency(secondaryPrice?.amount)} em{" "}
        <span className="text-green">
          {secondaryPrice?.installments}x{" "}
          {formatCurrency(secondaryPrice?.installmentAmount)} sem juros
        </span>
      </p>

      <Link href="/" className="text-blue-primary text-sm">
        Ver meios de pagamento e promoções
      </Link>
    </div>
  );
};

export default Price;
