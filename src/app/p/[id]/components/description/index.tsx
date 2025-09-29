import ContentLimiter from "@/components/content-limiter";
import { Product } from "@/types";

type Props = {
  description: Product["description"];
};

const Description = ({ description }: Props) => {
  return (
    <ContentLimiter label="descrição">
      <div>
        <h2 className="text-2xl text-black/90 mb-7">Descrição</h2>

        <div
          className="text-lg text-gray"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </ContentLimiter>
  );
};

export default Description;
