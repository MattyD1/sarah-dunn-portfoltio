import { CMSLink } from "@/components/link";
import { Media } from "@/components/media";
import { RichText } from "@/components/rich-text";
import { Page } from "@/payload-types";

export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  richText,
  media,
  backgroundImage,
}) => {
  return (
    <div className="relative bg-[#C4C9C9] h-screen flex px-6">
      <div className="absolute inset-0">
        {backgroundImage && (
          <Media
            imgClassName="w-full h-screen object-cover mask-b-from-60% mask-b-to-100%"
            priority
            resource={backgroundImage}
          />
        )}
      </div>
      <div className="flex flex-col justify-center gap-12">
        {richText && (
          <RichText
            data={richText}
            className="text-9xl tracking-[10] font-light leading-[1.2] mix-blend-difference"
          />
        )}
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

      <div className="absolute bottom-0 right-14 w-1/3">
        <div className="relative w-full border-2 border-white rounded-xl shadow-lg overflow-hidden">
          <Media
            imgClassName="w-full h-auto object-contain"
            priority
            resource={media}
          />
        </div>
      </div>
    </div>
  );
};
