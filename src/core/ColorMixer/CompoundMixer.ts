import Color from 'core/Color';
import { ColorMixerOptions } from './types';
import ColorMixer from './base';

export default class CompoundMixer extends ColorMixer {
  private readonly ANGLE_RANGE = 10;
  private readonly ANGLE_DISTANCE = 150;

  private readonly COLORS_BEFORE_RANDOM = 2;

  constructor(options: ColorMixerOptions) {
    super(options);
  }

  generateColors(): Color[] {
    const baseColorHSL = this.RGBToHSL(this.baseColor);
    const colors: Color[] = [this.baseColor];

    const LEFT_COLOR_MIN =
      baseColorHSL.hue + (this.ANGLE_DISTANCE + this.ANGLE_RANGE / 2);

    const RIGHT_COLOR_MIN =
      baseColorHSL.hue - (this.ANGLE_DISTANCE + this.ANGLE_RANGE / 2);

    const MINS = [LEFT_COLOR_MIN, RIGHT_COLOR_MIN];

    for (let i = 1; i < this.colorsQuantity; i++) {
      let randomAngle;
      if (i <= this.COLORS_BEFORE_RANDOM) {
        randomAngle =
          Math.floor(Math.random() * this.ANGLE_RANGE) + MINS[i - 1];
      } else {
        randomAngle = Math.random() * this.ANGLE_RANGE + MINS[(i + 1) % 2];
      }

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
