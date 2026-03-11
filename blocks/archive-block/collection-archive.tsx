import { Media } from "@/components/media";
import { cn } from "@/lib/utils";
import { Product } from "@/payload-types";

type Props = {
  products: CardProductData[];
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { products } = props;

  return (
    <div className={cn("container")}>
      <div>
        <div className="grid grid-cols-3 gap-y-4 gap-x-4">
          {products?.map((result, index) => {
            if (typeof result === "object" && result !== null) {
              return (
                <div key={index} className="aspect-square">
                  <Card doc={result} />
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

const Card: React.FC<{ doc?: CardProductData }> = ({ doc }) => {
  const { featureImage } = doc || {};

  return (
    <article className="w-full h-full min-h-full relative">
      <div className="w-full h-full bg-[#BCC2C2] rounded-2xl p-6">
        <div className="aspect-square flex place-content-center items-center w-full relative overflow-visible">
          {!featureImage && <div>No image</div>}

          {featureImage && typeof featureImage !== "string" && (
            <Media
              resource={featureImage}
              className="w-full h-full absolute left-0 top-0"
              pictureClassName="w-full h-full flex items-center justify-center"
              imgClassName="max-w-full max-h-full h-auto w-auto object-fit-contain border-2 border-white rounded-lg shadow-image"
            />
          )}
        </div>
      </div>
    </article>
  );
};
