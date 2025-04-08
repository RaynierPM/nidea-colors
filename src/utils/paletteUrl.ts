import { Palette } from "nidea-colors";

export function getPaletteUrl(palette: Palette): string {
  const colors = palette.colors.map((color) => color.hexColor);

  return `${location.origin}/shared/${colors.join("/")}`;
}
