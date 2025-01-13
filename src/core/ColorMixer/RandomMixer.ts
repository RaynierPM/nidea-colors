import Color from 'core/Color';
import { ColorMixerOptions } from './types';
import ColorMixer from './base';

export default class RandomMixer extends ColorMixer {
  constructor(options: ColorMixerOptions) {
    super(options);
  }

  private readonly ANGLE_RANGE = 360;

  generateColors(): Color[] {
    const colors: Color[] = [];
    for (let i = 0; i < this.colorsQuantity; i++) {
      const randomHSL = {
        hue: Math.random() * this.ANGLE_RANGE,
        saturation: this.saturation.get(),
        luminosity: this.luminosity.get(),
      };
      colors.push(this.HSLToRGB(randomHSL));
    }
    return colors;
  }
}
