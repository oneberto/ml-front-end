import { cookies } from "next/headers";
import CouponForm from "./form";

type Props = {
  productId: string;
  className?: string;
};

const Coupon = async (props: Props) => {
  const savedCoupon = (await cookies()).get("coupon")?.value;

  return <CouponForm savedCoupon={savedCoupon} {...props} />;
};

export default Coupon;
