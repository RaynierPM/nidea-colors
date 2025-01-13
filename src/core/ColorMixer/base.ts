import ColorMixerI from './interface/ColorMixer';
import { ColorMixerOptions, HSL } from './types.d';
import Color from 'core/Color';
import Factor from './utils/RandomFactor';

export default abstract class ColorMixer implements ColorMixerI {
  baseColor: Color;
  colorsQuantity: number;
  luminosity: Factor = new Factor(0.2, 0.8);
  saturation: Factor = new Factor(0.1, 0.9);

  private readonly MAX_COLOR_VALUE = 255;

  constructor(options: ColorMixerOptions) {
    this.baseColor = options.baseColor;
    this.colorsQuantity = options.colorsQuantity;
    if (options.luminosity) {
      this.luminosity = options.luminosity;
    }

    if (options.saturation) {
      this.saturation = options.saturation;
    }
  }

  abstract generateColors(): Color[];

  protected HSLToRGB(hsl: HSL): Color {
    let { hue } = hsl;
    const { saturation, luminosity } = hsl;

    hue = this.normalizeAngle(hue);
    const chroma = saturation * (1 - Math.abs(2 * luminosity - 1));
    const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = luminosity - chroma / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (hue >= 0 && hue < 60) {
      r = chroma;
      g = x;
    } else if (hue >= 60 && hue < 120) {
      r = x;
      g = chroma;
    } else if (hue >= 120 && hue < 180) {
      g = chroma;
      b = x;
    } else if (hue >= 180 && hue < 240) {
      g = x;
      b = chroma;
    } else if (hue >= 240 && hue < 300) {
      r = x;
      b = chroma;
    } else if (hue >= 300 && hue < 360) {
      r = chroma;
      b = x;
    }

    r = Math.round((r + m) * this.MAX_COLOR_VALUE);
    g = Math.round((g + m) * this.MAX_COLOR_VALUE);
    b = Math.round((b + m) * this.MAX_COLOR_VALUE);

    return new Color({
      red: r,
      green: g,
      blue: b,
    });
  }

  protected RGBToHSL(color: Color): HSL {
    const r = color.red / this.MAX_COLOR_VALUE;
    const g = color.green / this.MAX_COLOR_VALUE;
    const b = color.blue / this.MAX_COLOR_VALUE;

    const MAX = Math.max(r, g, b);
    const MIN = Math.min(r, g, b);

    const Chroma = MAX - MIN;

    const luminosity = (MAX + MIN) / 2;

    let saturation = 0;

    if (Chroma !== 0) {
      saturation = Chroma / (1 - Math.abs(2 * luminosity - 1));
    }

    let hue: number = 0;

    if (Chroma === 0) {
      hue = 0;
    }
    if (MAX === r) {
      hue = (60 * ((g - b) / Chroma)) % 360;
    } else if (MAX === g) {
      hue = 60 * ((b - r) / Chroma) + 120;
    } else if (MAX === b) {
      hue = 60 * ((r - g) / Chroma) + 240;
    }

    return { hue: this.normalizeAngle(hue), saturation, luminosity };
  }

  protected normalizeAngle(angle: number) {
    return Math.round(((angle % 360) + 360) % 360);
  }
}
