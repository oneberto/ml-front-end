import Button from "@/components/button";
import SidebarCard from "../card";
import { IconVerified } from "@/components/icons/verified";
import { IconMedal } from "@/components/icons/medal";
import { IconMessagePositive } from "@/components/icons/message-positive";
import { IconTimePositive } from "@/components/icons/time-positive";
import Thermometer from "../../thermometer";
import { ProductSeller } from "@/types";
import { formatThousands } from "@/utils";

type Props = {
  seller: ProductSeller;
};

const Seller = ({ seller }: Props) => {
  const {
    headerImage,
    title,
    thumb,
    isOfficial,
    totalFollowers,
    totalProducts,
    level,
  } = seller;

  return (
    <SidebarCard className="py-8">
      <div
        className="block relative h-[90px] w-full mb-5 bg-cover bg-center rounded-md"
        style={{
          backgroundImage: `url(${headerImage})`,
        }}
      >
        <div className="bg-white border border-card-border mr-4 w-[54px] h-[54px] flex items-center rounded-sm absolute left-2.5 -bottom-2.5">
          <img
            src={thumb}
            alt={title}
            width="100%"
            height="auto"
            className="rounded-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-lg text-black/90 font-semibold">{title}</p>
        <Button size="small" variant="secondary">
          Seguir
        </Button>
      </div>

      {isOfficial && (
        <>
          <p className="text-xs inline-flex gap-1 text-gray">
            Loja oficial do Mercado Livre{" "}
            <IconVerified width={14} height={14} />
          </p>
          <p className="text-xs inline-flex gap-1 text-gray">
            Vendido por Mercado Livre Eletronicos
          </p>
        </>
      )}

      <p className="text-xs inline-flex gap-1 text-gray mb-4">
        <span className="text-black/90 font-semibold">
          +{formatThousands(totalFollowers)}
        </span>{" "}
        Seguidores{" "}
        <span className="text-black/90 font-semibold">
          +{formatThousands(totalProducts)}
        </span>{" "}
        Produtos
      </p>

      <div className="flex gap-1.5 mb-2">
        <IconMedal width={16} height={16} className="text-green" />

        <div className="flex flex-1 flex-col">
          <p className="text-green text-sm font-semibold">{level.title}</p>
          <p className="text-xs text-gray">{level.subtitle}</p>
        </div>
      </div>

      <Thermometer score={level.score} />

      <div className="grid grid-cols-3 mb-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm text-black/90 font-semibold">+1 M</p>
          <p className="text-gray text-xs">Vendas</p>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <IconMessagePositive width={18} height={16} />

          <p className="text-gray text-xs">Bom atendimento</p>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <IconTimePositive width={18} height={16} />

          <p className="text-gray text-xs">Entrega no prazo</p>
        </div>
      </div>

      <Button size="regular" variant="secondary" className="w-full">
        Ir para a loja oficial
      </Button>
    </SidebarCard>
  );
};

export default Seller;
