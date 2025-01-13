import Color from './Color';
import Factor from './ColorMixer/utils/RandomFactor';
import Palette from './palette';

export enum PaletteType {
  RANDOM,
  MONOCHROMATIC,
  ANALOGOUS,
  COMPLEMENTARY,
  TRIADIC,
  COMPOUND,
}

export enum PaletteEditType {
  ADD_COLOR,
  REMOVE_COLOR,
}

export enum PaletteColorsLimit {
  MAX = 6,
  MIN = 2,
}

export declare type PaletteGenerationOptions = {
  lockedColors: Color[];
  baseColor?: Color;
};

export interface PaletteEditionOptions {
  type: PaletteEditType;
  palette: Palette;
  baseColor: Color;
}

export interface generatePaletteOptions {
  paletteType: PaletteType;
  lockedColors: Color[];
  colorsQuantity: number;
  baseColor?: Color;
  luminosity?: Factor;
  saturation?: Factor;
}

export type PaletteGenerator = (options: generatePaletteOptions) => Palette;
