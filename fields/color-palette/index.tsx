"use client";

import "./style.scss";

import { useEffect } from "react";
import { FieldLabel, useField, useWatchForm } from "@payloadcms/ui";
import { Field, JSONField } from "payload";

import { generatePalette } from "./generate-palette";
import { ColorPalette as ColorPaletteType } from "./types";

type ColorPaletteProps = (options?: {
  overrides?: Partial<JSONField>;
}) => Field;

const ColorPalette: React.FC<ColorPaletteProps> = ({}) => {
  const { setValue, value } = useField<ColorPaletteType>({});
  // const [localValue, setLocalValue] = useState(value || {});

  const { fields } = useWatchForm();
  const {
    ["theme.accentColor"]: { value: accent },
    ["theme.backgroundColor"]: { value: background },
    ["theme.grayColor"]: { value: gray },
    ["theme.dark"]: { value: dark },
  } = fields;

  useEffect(() => {
    const palette = generatePalette({
      appearance: dark ? "dark" : "light",
      accent: (accent as string | null) ?? "#fff",
      gray: (gray as string | null) ?? "#fff",
      background: (background as string | null) ?? "#fff",
    });

    if (!palette) return;

    setValue(palette);
  }, [dark, accent, background, gray, setValue]);

  if (!value?.accentScale) return <div>no scales</div>;

  return (
    <div className="color-palette">
      <FieldLabel label="Palette" as="h3" />
      <div className="color-palette__main">
        <div className="color-palette__input-grid">
          {/* Labels */}
          <ColorUsageRange style={{ gridColumn: "1/3" }}>
            Backgrounds
          </ColorUsageRange>
          <ColorUsageRange style={{ gridColumn: "3/6" }}>
            Interative Components
          </ColorUsageRange>
          <ColorUsageRange style={{ gridColumn: "6/9" }}>
            Borders and Separators
          </ColorUsageRange>
          <ColorUsageRange style={{ gridColumn: "9/11" }}>
            Solid Colors
          </ColorUsageRange>
          <ColorUsageRange style={{ gridColumn: "11/13" }}>
            Accessible Text
          </ColorUsageRange>

          {/* Accent Grid */}
          {value?.accentScale.map((color, i) => {
            const id = `color-palette-accent-${i}`;
            return (
              <input
                key={id}
                id={id}
                type="color"
                title={color}
                aria-label={`Select color ${color}`}
                className="color-palette__color-input"
                value={color}
              />
            );
          })}

          {/* Gray Grid */}
          {value?.grayScale.map((color, i) => {
            const id = `color-palette-gray-${i}`;
            return (
              <input
                key={id}
                id={id}
                type="color"
                title={color}
                aria-label={`Select color ${color}`}
                className="color-palette__color-input"
                value={color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ColorUsageRange = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className="color-usage-range" {...props}>
      <p className="color-usage-range__text">{children}</p>
      <div className="color-usage-range__border" />
    </div>
  );
};

export default ColorPalette;
