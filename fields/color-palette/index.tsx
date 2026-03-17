"use client";

import "./style.scss";

import { Button, FieldLabel, Link, Table, useField } from "@payloadcms/ui";
import Color from "colorjs.io";
import { Field, JSONField } from "payload";

import { ColorPalette as ColorPaletteType } from "./types";

type ColorPaletteProps = (options?: {
  overrides?: Partial<JSONField>;
}) => Field;

const useCases: Record<number, string> = {
  1: "App background",
  2: "Subtle background",
  3: "UI elelement background",
  4: "Hovered UI element background",
  5: "Active / Selected UI element background",
  6: "Subtle borders and separators",
  7: "UI element border and focus rings",
  8: "Hovered UI element borders",
  9: "Solid backgrounds",
  10: "Hovered solid background",
  11: "Low-contrast text",
  12: "High-contrast text",
};

const ColorPalette: React.FC<ColorPaletteProps> = ({}) => {
  const { value } = useField<ColorPaletteType>({});

  if (!value?.accentScale) return <div>no scales</div>;

  const data: Record<string, unknown>[] = [{ string: "test" }];

  return (
    <div className="color-palette">
      <FieldLabel label="Color Palette" as="h3" />
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

          {Array.from({ length: 12 }).map((_, i) => (
            <ColorNumber key={i}>{(i + 1).toString()}</ColorNumber>
          ))}

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
      <div className="color-palette__details">
        <div className="color-palette__details-heading">
          <FieldLabel label="Understanding the Palette" as="h3" />
          <Link
            href="https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </Link>
        </div>
        <table className="color-palette__table">
          <thead>
            <tr>
              <th className="color-palette__table__table-heading">
                <p className="color-palette__table__table-text">Step</p>
              </th>
              <th className="color-palette__table__table-heading">
                <p className="color-palette__table__table-text">Use Case</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(useCases).map(([key, value]) => {
              return (
                <tr
                  key={key}
                  style={{
                    backgroundColor:
                      Number(key) % 2 === 1
                        ? "var(--theme-elevation-50)"
                        : "transparent",
                  }}
                >
                  <td className="color-palette__table__table-details">
                    <p className="color-palette__table__table-text">{key}</p>
                  </td>
                  <td className="color-palette__table__table-details">
                    <p className="color-palette__table__table-text">{value}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

const ColorNumber = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className="color-number" {...props}>
      <p className="color-number__text">{children}</p>
    </div>
  );
};

export default ColorPalette;
