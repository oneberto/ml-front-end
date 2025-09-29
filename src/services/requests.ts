import { cache } from "react";
import api from "./api";
import {
  PaymentMethod,
  PriceCoupon,
  Product,
  ProductPrice,
  ProductSeller,
} from "@/types";
import { unstable_cache } from "next/cache";

export const getProduct = cache(async (id: string) => {
  const { data } = await api.post<Product>("/product-details", {
    id,
  });

  return data;
});

export const getSeller = cache(async (id: string) => {
  const { data } = await api.get<ProductSeller>(`/sellers/${id}`);

  return data;
});

export const getPaymentMethods = cache(async () => {
  const { data } = await api.get<PaymentMethod[]>("/payment-methods");

  return data;
});

export const getProductPrices = unstable_cache(
  async (productId: string, couponCode?: string) => {
    const { data } = await api.post<{
      prices: ProductPrice[];
      coupon: PriceCoupon;
    }>("/prices-by-product", {
      productId,
      ...(!!couponCode && { couponCode }),
    });

    return data;
  },
  ["get-product-prices"],
  {
    tags: ["get-product-price-tag"],
  }
);

export const checkCoupon = cache(async (code: string) => {
  const { data } = await api.post<PriceCoupon>("/check-coupon", { code });

  return data;
});
