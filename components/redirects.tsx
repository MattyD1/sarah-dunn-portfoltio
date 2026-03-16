import { notFound } from "next/navigation";

interface Props {
  disableNotFound?: boolean;
  url: string;
}

export const Redirects: React.FC<Props> = async ({ disableNotFound }) => {
  if (disableNotFound) return null;

  notFound();
};
