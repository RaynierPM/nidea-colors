import Color from 'core/Color';
import Factor from './utils/RandomFactor';

export interface ColorMixerOptions {
  baseColor: Color;
  colorsQuantity: number;
  luminosity?: Factor;
  saturation?: Factor;
}

export type HSL = {
  hue: number;
  saturation: number;
  luminosity: number;
};

export enum PercentLevel {
  LOW,
  MEDIUM_HIGH,
  MEDIUM,
  HIGH,
  ABSOLUTE,
}
