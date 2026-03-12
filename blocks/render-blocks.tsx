import { Page } from "@/payload-types";
import { Fragment } from "react";
import { ArchiveBlock } from "./archive-block/component";
import { MediaBlock } from "./media-block/component";
import { ContentBlock } from "./content-block/component";
import { LinksBlock } from "./links-block/component";
import { BlockContainer } from "@/components/block-container";

const blockComponents = {
  archiveBlock: ArchiveBlock,
  mediaBlock: MediaBlock,
  contentBlock: ContentBlock,
  linksBlock: LinksBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <Fragment>
      {blocks.map((block, i) => {
        const { blockType } = block;

        if (!blockType || !(blockType in blockComponents)) return null;

        const Block = blockComponents[blockType];

        if (!Block) return null;

        return (
          <BlockContainer
            key={i}
            gradient={block.gradient}
            container={block.container}
            backgroundColor={block.backgroundColor}
          >
            {/* @ts-expect-error there may be some mismatch between the expected types here */}
            <Block {...block} />
          </BlockContainer>
        );
      })}
    </Fragment>
  );
};
