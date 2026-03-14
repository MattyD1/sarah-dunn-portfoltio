import { generatePalette } from "./generate-palette";

export type GeneratedColors = ReturnType<typeof generatePalette>;

export type ArrayOf12<T> = [T, T, T, T, T, T, T, T, T, T, T, T];

export type ColorPalette = {
  accentScale: ArrayOf12<string>;
  accentScaleWideGamut: ArrayOf12<string>;
  grayScale: ArrayOf12<string>;
  grayScaleWideGamut: ArrayOf12<string>;
  graySurface: string;
  graySurfaceWideGamut: string;
  accentSurface: string;
  accentSurfaceWideGamut: string;
};

export const grayScaleNames = [
  "gray",
  "mauve",
  "slate",
  "sage",
  "olive",
  "sand",
] as const;

export const scaleNames = [
  ...grayScaleNames,
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "brown",
  "orange",
  "sky",
  "mint",
  "lime",
  "yellow",
  "amber",
] as const;
