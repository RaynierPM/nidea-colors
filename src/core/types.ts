import Color from './Color';
import Palette from './palette';

export enum PaletteType {
  RANDOM,
  MONOCHROMATIC,
  ANALOGOUS,
  COMPLEMENTARY,
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
