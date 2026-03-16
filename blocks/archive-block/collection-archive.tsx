import { Product } from "@/payload-types";

import { cn } from "@/lib/utils";
import { Media } from "@/components/media";

type Props = {
  products: CardProductData[];
  backgroundColor: string;
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { products, backgroundColor } = props;

  return (
    <div className={cn("container")}>
      <div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-4">
          {products?.map((result, index) => {
            if (typeof result === "object" && result !== null) {
              return (
                <div key={index} className="aspect-square">
                  <Card doc={result} backgroundColor={backgroundColor} />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

type CardProductData = Pick<Product, "featureImage">;

const Card: React.FC<{ doc?: CardProductData; backgroundColor: string }> = ({
  doc,
  backgroundColor,
}) => {
  const { featureImage } = doc || {};

  return (
    <article className="relative h-full min-h-full w-full">
      <div
        className="h-full w-full rounded-2xl p-6"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div className="relative flex aspect-square w-full place-content-center items-center overflow-visible">
          {!featureImage && <div>No image</div>}

          {featureImage && typeof featureImage !== "string" && (
            <Media
              resource={featureImage}
              className="absolute top-0 left-0 h-full w-full"
              pictureClassName="w-full h-full flex items-center justify-center"
              imgClassName="max-w-full max-h-full h-auto w-auto object-fit-contain border-2 border-white rounded-lg shadow-image"
            />
          )}
        </div>
      </div>
    </article>
  );
};
