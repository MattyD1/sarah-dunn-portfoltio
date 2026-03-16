import { Footer as FooterType } from "@/payload-types";

import { getCachedGlobal } from "@/lib/get-globals";
import { CMSLink } from "@/components/link";

export const Footer = async () => {
  const footerData: FooterType = await getCachedGlobal("footer", 1)();

  const { title, contactInfo, socials, navItems } = footerData;

  return (
    <footer className="mx-32 flex flex-row justify-between pt-16 text-(--accent-twelve)">
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
                            className="text-sm font-light tracking-wider"
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
