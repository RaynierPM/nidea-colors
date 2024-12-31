import Color from './Color';
import { InvalidColorsQuantityError } from './errors/PaletteFactory';
import Palette from './palette';
import {
  ColorGenerationOptions,
  PaletteEditionOptions,
  PaletteEditType,
  PaletteGenerationType,
} from './types';

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
        palette.addColor(
          ColorFactory.getColor({ type: PaletteGenerationType.RANDOM }),
        );
      } else {
        palette.addColor(...lockedColors);
      }
    } else if (colorGenerated > 0) {
      for (let i = 0; i < colorsQuantity; i++) {
        if (i < lockedColors.length) {
          palette.addColor(lockedColors[i]);
        } else {
          palette.addColor(
            ColorFactory.getColor({ type: PaletteGenerationType.RANDOM }),
          );
        }
      }
    }

    return palette;
  }

  static getPaletteGenerator(type?: PaletteGenerationType): PaletteGenerator {
    switch (type) {
      case PaletteGenerationType.RANDOM:
        return PaletteFactory.generateRandomPalette;
      case PaletteGenerationType.MONOCHROMATIC:
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

  static editPalette(options: PaletteEditionOptions): Palette {
    const { type, palette, color } = options;
    switch (type) {
      case PaletteEditType.ADD_COLOR:
        palette.addColor(color);
        return palette.clone();
      case PaletteEditType.REMOVE_COLOR:
        palette.removeColor(color);
        return palette;
      default:
        return palette;
    }
  }
}

export abstract class ColorFactory {
  private static generateRandomColor(): Color {
    const randomColor = Math.round(Math.random() * parseInt('FFFFFF', 16));
    return new Color(randomColor);
  }

  static getColor(options: ColorGenerationOptions): Color {
    switch (options.type) {
      case PaletteGenerationType.RANDOM:
        return ColorFactory.generateRandomColor();
      case PaletteGenerationType.MONOCHROMATIC:
        return ColorFactory.generateMonochromaticColor();
      default:
        return ColorFactory.generateRandomColor();
    }
  }

  private static generateMonochromaticColor(): Color {
    return new Color(10);
  }
}
