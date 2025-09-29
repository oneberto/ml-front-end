"use server";

import { IconCreditCard } from "@/components/icons/credit-card";
import SidebarCard from "../card";
import Link from "next/link";
import { getPaymentMethods } from "@/services/requests";

const PaymentMethods = async () => {
  const paymentMethods = await getPaymentMethods();

  return (
    <SidebarCard
      data-testid="payment-methods"
      className="py-8 gap-5 flex flex-col"
    >
      <p className="text-black/90 text-lg">Meios de pagamento</p>

      <div className="flex items-center h-[46px] bg-green rounded-sm text-white px-5">
        <IconCreditCard className="mr-2.5" width={20} />
        <p className="text-sm">
          Pague em <span className="font-semibold">até 18x sem juros</span>!
        </p>
      </div>

      {paymentMethods.map(({ images, title }) => (
        <div key={title}>
          <p
            className="text-black/90 text-lg"
            data-testid="payment-method-title"
          >
            {title}
          </p>

          <div className="flex gap-3">
            {images.map(({ url, alt }) => (
              <div
                key={url}
                className="w-[50px] h-[50px] flex items-center justify-center"
              >
                <img src={url} alt={alt} className="max-w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Link href="/" className="text-blue-primary text-sm">
        Confira outros meios de pagamento
      </Link>
    </SidebarCard>
  );
};

export default PaymentMethods;
