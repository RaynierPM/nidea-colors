import Color from 'core/Color';
import { ColorMixerOptions } from './types.d';
import ColorMixer from './base';

export default class MonochromaticMixer extends ColorMixer {
  constructor(options: ColorMixerOptions) {
    super(options);
  }

  generateColors(): Color[] {
    const baseColorHSL = this.RGBToHSL(this.baseColor);
    const colors: Color[] = [this.baseColor];

    const ANGLE_RANGE = 20;
    const ANGLE_MIN = baseColorHSL.hue - ANGLE_RANGE / 2;

    for (let i = 1; i < this.colorsQuantity; i++) {
      const randomAngle = Math.floor(Math.random() * ANGLE_RANGE) + ANGLE_MIN;

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
