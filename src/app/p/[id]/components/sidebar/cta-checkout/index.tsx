import Button from "@/components/button";
import SidebarCard from "../card";
import { IconFull } from "@/components/icons/full";
import Tag from "@/components/tag";
import classNames from "classnames";

type Props = {
  className?: string;
};

const CTACheckout = ({ className }: Props) => {
  return (
    <SidebarCard className={classNames("xl:py-6", className)}>
      <div className="mb-3">
        <Tag color="green">FRETE GRÁTIS ACIMA DE R$ 19</Tag>

        <p className="text-green font-semibold">Receba grátis amanhã</p>
        <p className="text-gray text-sm">Comprando dentro das próximas</p>
        <p className="text-black text-sm">8 h 22 min</p>
      </div>

      <div className="mb-6">
        <p className="text-black font-semibold">Estoque disponível</p>
        <p className="text-sm text-gray flex items-center gap-1.5">
          Armazenado e enviado pelo <IconFull />
        </p>
      </div>

      <Button variant="primary" size="large" className="w-full mb-2">
        Comprar agora
      </Button>
      <Button variant="secondary" size="large" className="w-full">
        Adicionar ao carrinho
      </Button>
    </SidebarCard>
  );
};

export default CTACheckout;
