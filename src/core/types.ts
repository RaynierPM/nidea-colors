import Color from './Color';
import Palette from './palette';

export enum PaletteGenerationType {
  RANDOM,
  MONOCHROMATIC,
}

export enum PaletteEditType {
  ADD_COLOR,
  REMOVE_COLOR,
}

export enum PaletteColorsLimit {
  MAX = 6,
  MIN = 2,
}

export interface PaletteEditionOptions {
  type: PaletteEditType;
  palette: Palette;
  color: Color;
}

export interface ColorGenerationOptions {
  type: PaletteGenerationType;
  monoChromaticColorBase?: Color;
  colors?: Color[];
}
