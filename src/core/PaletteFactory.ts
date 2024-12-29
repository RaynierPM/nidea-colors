import Color from './Color';
import { InvalidColorsQuantityError } from './errors/PaletteFactory';
import Palette from './palette';

export default class PaletteFactory {
  static generateRandomPalette(
    colorsQuantity: number,
    lockedColors: Color[] = [],
  ): Palette {
    const palette = new Palette();

    if (lockedColors.length > colorsQuantity) {
      throw new InvalidColorsQuantityError(colorsQuantity);
    }

    const colorGenerated = colorsQuantity - lockedColors.length;

    if (!colorGenerated && lockedColors.length >= 0) {
      if (!lockedColors.length) {
        palette.addColor(Color.generateRandomColor());
      } else {
        palette.addColor(...lockedColors);
      }
    } else if (colorGenerated > 0) {
      for (let i = 0; i < colorsQuantity; i++) {
        if (i < lockedColors.length) {
          palette.addColor(lockedColors[i]);
        } else {
          palette.addColor(Color.generateRandomColor());
        }
      }
    }

    return palette;
  }
}
