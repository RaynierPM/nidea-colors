import Color from './Color';
import { InvalidColorsQuantityError } from './errors/PaletteFactory';
import Palette from './palette';
import { PalleteGenerationType } from './types';

export declare type PaletteGenerationOptions = {
  lockedColors: Color[];
};

export type PaletteGenerator = (
  colorsQuantity: number,
  generationOptions: PaletteGenerationOptions,
) => Palette;

const PaletteGenerationOptionsDefault: Readonly<PaletteGenerationOptions> = {
  lockedColors: [],
};

export default class PaletteFactory {
  private static generateRandomPalette(
    colorsQuantity: number,
    options: PaletteGenerationOptions = PaletteGenerationOptionsDefault,
  ): Palette {
    const palette = new Palette();
    const { lockedColors } = { ...PaletteGenerationOptionsDefault, ...options };

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

  static getPaletteGenerator(type?: PalleteGenerationType): PaletteGenerator {
    switch (type) {
      case PalleteGenerationType.RANDOM:
        return PaletteFactory.generateRandomPalette;
      case PalleteGenerationType.MONOCHROMATIC:
        return PaletteFactory.generateMonochromaticPalette;
      default:
        return PaletteFactory.generateRandomPalette;
    }
  }

  private static generateMonochromaticPalette(
    colorsQuantity: number,
    generationOptions: PaletteGenerationOptions,
  ): Palette {
    console.log(generationOptions);
    console.log(colorsQuantity);
    return new Palette();
  }
}
