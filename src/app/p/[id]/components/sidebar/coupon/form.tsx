"use client";

import Button from "@/components/button";
import SidebarCard from "../card";
import { sendCoupon } from "./actions";
import Tag from "@/components/tag";
import classNames from "classnames";
import { useActionState } from "react";

// https://nextjs.org/docs/app/guides/forms#validation-errors

type Props = {
  productId: string;
  className?: string;
  savedCoupon?: string;
};

const CouponForm = ({ productId, className, savedCoupon }: Props) => {
  const [state, formAction, pending] = useActionState(
    sendCoupon,
    !!savedCoupon
      ? {
          message: `Cupom ${savedCoupon.toUpperCase()} adicionado!`,
          success: true,
        }
      : {
          message: "",
        }
  );

  const { success, message } = state;

  return (
    <SidebarCard className={classNames("xl:py-6", className)}>
      <p className="text-black/90 text-lg mb-4">Cupom de desconto</p>

      {!!message && !pending && (
        <Tag color={success ? "green" : "red"} className="!text-base">
          {message}
        </Tag>
      )}
      <form
        className="flex flex-col gap-4"
        action={formAction}
        data-testid="coupon-form"
      >
        <input type="hidden" name="productId" defaultValue={productId} />

        {success === true ? (
          <>
            <input type="hidden" name="action" defaultValue="remove-coupon" />

            <Button
              type="submit"
              size="large"
              disabled={pending}
              variant="secondary"
            >
              {pending ? "Removendo..." : "Remover"}
            </Button>
          </>
        ) : (
          <>
            <input
              required
              name="code"
              type="text"
              placeholder="Insira o cupom de desconto"
              className="outline-0 px-3.5 bg-white shadow h-[48px] border border-card-border focus-within:border-[#3483fa] rounded-md"
              data-testid="coupon-input"
            />
            <input type="hidden" name="action" defaultValue="send-coupon" />

            <Button type="submit" size="large" disabled={pending}>
              {pending ? "Enviando..." : "Enviar"}
            </Button>
          </>
        )}
      </form>
    </SidebarCard>
  );
};

export default CouponForm;
