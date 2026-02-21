import { ReactLenis } from "lenis/react";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <ReactLenis root />
      {children}
    </>
  );
};
