import Color from 'core/Color';
import { ColorMixerOptions } from './types';
import ColorMixer from './base';

export default class ComplementaryMixer extends ColorMixer {
  private readonly ANGLE_RANGE = 10;
  private readonly ANGLE_DISTANCE = 180;

  constructor(options: ColorMixerOptions) {
    super(options);
  }

  generatePalette(): Color[] {
    const baseColorHSL = this.RGBToHSL(this.baseColor);
    const colors: Color[] = [this.baseColor];

    const BASE_COLOR_MIN = baseColorHSL.hue + this.ANGLE_RANGE / 2;

    const COMPLEMENTED_COLOR_MIN =
      baseColorHSL.hue + (this.ANGLE_DISTANCE + this.ANGLE_RANGE / 2);

    const MINS = [BASE_COLOR_MIN, COMPLEMENTED_COLOR_MIN];

    for (let i = 1; i < this.colorsQuantity; i++) {
      const randomAngle =
        Math.floor(Math.random() * this.ANGLE_RANGE) + MINS[i % 2];

      const randomHSL = {
        hue: randomAngle,
        saturation: this.saturation.get(),
        luminosity: this.luminosity.get(),
      };
      colors.push(this.HSLToRGB(randomHSL));
    }
    return colors;
  }
}
