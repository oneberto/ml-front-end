import ContentLimiter from "@/components/content-limiter";
import { Product } from "@/types";

type Props = {
  details: Product["details"];
};

const Details = ({ details }: Props) => {
  return (
    <ContentLimiter label="detalhes" maxHeight={700}>
      <div>
        <h2 className="text-2xl text-black/90 mb-7">Detalhes do produto</h2>

        {details.map(({ image }) => (
          <img
            key={image}
            src={image}
            alt="Detalhes do produto"
            className="max-w-full"
          />
        ))}
      </div>
    </ContentLimiter>
  );
};

export default Details;
