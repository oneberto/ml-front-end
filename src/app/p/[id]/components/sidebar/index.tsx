import CTACheckout from "./cta-checkout";
import Seller from "./seller";
import PaymentMethods from "./payment-methods";
import { Product, ProductSeller } from "@/types";
import { Suspense } from "react";
import Coupon from "./coupon";

export type SidebarProps = Pick<Product, "delivery" | "id"> & {
  seller: ProductSeller;
};

const Sidebar = ({ seller, id }: SidebarProps) => {
  return (
    <div className="gap-6 flex flex-col mb-6 w-full xl:w-[300px] xl:shrink-0">
      <Coupon productId={id} />

      <CTACheckout className="hidden xl:block" />

      <Seller seller={seller} />

      <Suspense fallback={<div />}>
        <PaymentMethods />
      </Suspense>
    </div>
  );
};

export default Sidebar;
