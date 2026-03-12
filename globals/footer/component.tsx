import { CMSLink } from "@/components/link";
import { getCachedGlobal } from "@/lib/get-globals";
import { Footer as FooterType } from "@/payload-types";

export const Footer = async () => {
  const footerData: FooterType = await getCachedGlobal("footer", 1)();

  const { title, contactInfo, socials, navItems } = footerData;

  console.log(socials);

  return (
    <footer className="flex flex-row mx-32 pt-16 justify-between mix-blend-difference">
      <div className="flex flex-col gap-4">
        <h1 className="text-base">{title}</h1>
        <p className="text-sm font-light tracking-wider">{contactInfo}</p>
        <div>
          {Array.isArray(socials) && socials.length > 0 && (
            <ul className="flex gap-2">
              {socials.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mb-14">
        {Array.isArray(navItems) && navItems.length > 0 && (
          <ul className="flex flex-row gap-14">
            {navItems.map(({ groupName, links }, i) => (
              <li key={i}>
                <h2 className="mb-4">{groupName}</h2>
                <div>
                  {Array.isArray(links) && links.length > 0 && (
                    <ul className="flex flex-col gap-4">
                      {links.map(({ link }, j) => (
                        <li key={j}>
                          <CMSLink
                            className="text-sm tracking-wider font-light"
                            {...link}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
};
