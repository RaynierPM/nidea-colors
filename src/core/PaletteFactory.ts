import Color from './Color';
import { ColorMixerOptions } from './ColorMixer/types.d';
import { getColorMixer } from './ColorMixer/utils/getColorMixer';
import {
  InvalidColorsQuantityError,
  InvalidParametersError,
} from './errors/PaletteFactory';
import Palette from './palette';
import {
  generatePaletteOptions,
  PaletteColorsLimit,
  PaletteEditionOptions,
  PaletteEditType,
  PaletteGenerator,
  PaletteType,
} from './types';

export default class PaletteFactory {
  static getPaletteGenerator(): PaletteGenerator {
    return (options: generatePaletteOptions) => {
      const {
        lockedColors = [],
        colorsQuantity,
        paletteType,
        baseColor,
        luminosity,
        saturation,
      } = options;

      validatePaletteGeneration({
        colorsQuantity: colorsQuantity,
        lockedColors: lockedColors.length,
        needBaseColor: paletteType !== PaletteType.RANDOM,
      });

      const colorMixerOption: ColorMixerOptions = {
        baseColor: baseColor || Color.generateRandomColor(),
        colorsQuantity: options.colorsQuantity,
        luminosity,
        saturation,
      };

      const colorMixer = getColorMixer({
        type: paletteType,
        options: colorMixerOption,
      });

      const colors = colorMixer.generatePalette();

      return new Palette(colors);
    };
  }

  static editPalette(options: PaletteEditionOptions): Palette {
    const { type, palette, baseColor } = options;
    switch (type) {
      case PaletteEditType.ADD_COLOR:
        palette.addColor(baseColor);
        return palette;
      case PaletteEditType.REMOVE_COLOR:
        palette.removeColor(baseColor);
        return palette;
      default:
        return palette;
    }
  }
}

function validatePaletteGeneration({
  colorsQuantity,
  lockedColors,
  needBaseColor = false,
}: {
  colorsQuantity: number;
  lockedColors: number;
  needBaseColor?: boolean;
}): void {
  if (
    colorsQuantity < PaletteColorsLimit.MIN ||
    colorsQuantity > PaletteColorsLimit.MAX
  ) {
    throw new InvalidColorsQuantityError(colorsQuantity);
  }

  if (lockedColors > colorsQuantity) {
    throw new InvalidParametersError();
  }

  if (needBaseColor && lockedColors != 1) {
    throw new InvalidParametersError();
  }
}
