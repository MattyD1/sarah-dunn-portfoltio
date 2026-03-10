import { CMSLink } from "@/components/link";
import type {
  ArchiveBlock as ArchiveBlockProps,
  Product,
} from "@/payload-types";
import { CollectionArchive } from "./collection-archive";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & { id?: string }
> = async (props) => {
  const { id, heading, links, selectedDocs } = props;

  let products: Product[] = [];

  if (selectedDocs?.length) {
    const payload = await getPayload({ config: configPromise });

    const flattenedDocs = selectedDocs?.map((doc) => {
      if (typeof doc.value === "object") return doc.value.id;
      else return doc.value;
    });

    const fetchedDocs = await payload.find({
      collection: "products",
      depth: 1,
      ...(flattenedDocs && flattenedDocs.length > 0
        ? {
            where: {
              id: {
                in: flattenedDocs,
              },
            },
          }
        : {}),
    });

    products = fetchedDocs.docs;
  }

  return (
    <div className="my-16 mx-32" id={`block-${id}`}>
      <div className="flex flex-row justify-between pb-4">
        <h2 className="text-4xl font-light capitalize tracking-wider mix-blend-difference">
          {heading}
        </h2>
        <div>
          {Array.isArray(links) && links.length > 0 && (
            <ul>
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <CollectionArchive products={products} />
    </div>
  );
};
