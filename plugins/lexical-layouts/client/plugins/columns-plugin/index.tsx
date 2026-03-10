import "./index.scss";

import { PluginComponent } from "@payloadcms/richtext-lexical";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "@payloadcms/richtext-lexical/lexical";
import { formatDrawerSlug, useEditDepth } from "@payloadcms/ui";
import React, { useEffect } from "react";
import { INSERT_LAYOUT_COMMAND, LayoutPlugin } from "../layout-plugin";
import {
  FieldsDrawer,
  useEditorConfigContext,
  useLexicalDrawer,
} from "@payloadcms/richtext-lexical/client";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { LayoutContainerNode } from "../../nodes/layout-container-node";
import { LayoutItemNode } from "../../nodes/layout-item-node";
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils";

export const OPEN_LAYOUTS_DRAWER_COMMAND: LexicalCommand<object> =
  createCommand("OPEN_EMBED_DRAWER_COMMAND");

export const ColumnsPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext();
  const {
    fieldProps: { schemaPath },
    uuid,
  } = useEditorConfigContext();
  const edithDepth = useEditDepth();

  const drawerSlug = formatDrawerSlug({
    slug: "lexical-columns-create-" + uuid,
    depth: edithDepth,
  });

  const { toggleDrawer } = useLexicalDrawer(drawerSlug, true);

  useEffect(() => {
    if (!editor.hasNodes([LayoutContainerNode, LayoutItemNode])) {
      throw new Error(
        "LayoutPlugin: LayoutContainerNode, or LayoutItemNode is not registered on editor",
      );
    }

    return mergeRegister(
      editor.registerCommand(
        OPEN_LAYOUTS_DRAWER_COMMAND,
        () => {
          let rangeSelection: null | object = null;

          editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              rangeSelection = selection;
            }
          });

          if (rangeSelection) {
            toggleDrawer();
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [editor, toggleDrawer]);

  return (
    <React.Fragment>
      <FieldsDrawer
        drawerSlug={drawerSlug}
        drawerTitle="Create Columns Layout"
        featureKey="layouts"
        handleDrawerSubmit={(_fields, data) => {
          console.log(data);
          if (!data.columns) return;

          console.log(data);

          editor.dispatchCommand(INSERT_LAYOUT_COMMAND, String(data.columns));
        }}
        schemaPath={schemaPath}
        schemaPathSuffix="fields"
      />
      <LayoutPlugin />
    </React.Fragment>
  );
};
