import Color from 'core/Color';

export interface ColorMixerOptions {
  baseColor: Color;
  colorsQuantity: number;
}

export type HSL = {
  hue: number;
  saturation: number;
  luminosity: number;
};

export enum PercentLevel {
  LOW,
  MEDIUM,
  HIGH,
}
