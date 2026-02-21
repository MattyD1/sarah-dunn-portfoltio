import React, { Fragment } from "react";

import type { Props } from "./types";

import { ImageMedia } from "./image";

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = "div" } = props;

  const Tag = htmlElement || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      <ImageMedia {...props} />
    </Tag>
  );
};
