"use server";

import { getProductPrices } from "@/services/requests";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type State = {
  message: string;
  success?: boolean;
};

export const sendCoupon = async (
  _initialState: State,
  formData: FormData
): Promise<State> => {
  try {
    const code = formData.get("code") as string;
    const action = formData.get("action") as "send-coupon" | "remove-coupon";
    const productId = formData.get("productId") as string;

    if (action === "remove-coupon") {
      (await cookies()).delete("coupon");

      return {
        message: "",
      };
    }

    if (!code) {
      throw new Error();
    }

    // Request prices with new coupon
    const { coupon } = await getProductPrices(productId, code);

    if (!coupon) {
      throw new Error();
    }

    (await cookies()).set("coupon", code);

    // update prices cache
    revalidateTag("get-product-price-tag");

    return {
      message: `Cupom ${code} adicionado!`,
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      message: "Error ao adicionar o cupom!",
      success: false,
    };
  }
};
