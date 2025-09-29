import CTACheckout, { CTACheckoutProps } from "./cta-checkout";
import Seller from "./seller";
import PaymentMethods from "./payment-methods";
import { Product, ProductSeller } from "@/types";
import Coupon from "./coupon";

export type SidebarProps = Pick<Product, "id"> & {
  seller: ProductSeller;
  ctaCheckoutProps: CTACheckoutProps;
};

const Sidebar = ({ seller, id, ctaCheckoutProps }: SidebarProps) => {
  return (
    <div className="gap-6 flex flex-col mb-6 w-full xl:w-[300px] xl:shrink-0">
      <Coupon productId={id} className="hidden xl:block" />

      <CTACheckout className="hidden xl:block" {...ctaCheckoutProps} />

      <Seller seller={seller} />

      <PaymentMethods />
    </div>
  );
};

export default Sidebar;
