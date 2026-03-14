import { CMSLink } from "@/components/link";
import { Media } from "@/components/media";
import { LinksBlock as LinksBlockProps } from "@/payload-types";

export const LinksBlock: React.FC<LinksBlockProps & { id?: string }> = (
  props,
) => {
  const { id, heading, media, links } = props;

  return (
    <div id={`block-${id}`}>
      <h2 className="text-5xl max-w-[12ch] font-light capitalize tracking-wider mb-9">
        {heading}
      </h2>
      <div className="grid grid-cols-5 gap-24">
        <div className="col-span-2">
          {!media && <div>No image</div>}

          {media && typeof media !== "string" && (
            <Media
              resource={media}
              pictureClassName="w-full h-full flex items-center justify-center"
              imgClassName="max-w-full max-h-full h-auto w-auto object-fit-contain border-2 border-white rounded-lg shadow-image"
            />
          )}
        </div>
        <div className="col-span-3">
          {Array.isArray(links) && links.length > 0 && (
            <ul>
              {links.map(({ link }, i) => (
                <li key={i} className="mb-3">
                  <CMSLink {...link} size="full" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
