import Color from './Color';
import AnalogousMixer from './ColorMixer/AnalogousMixer';
import ComplementaryMixer from './ColorMixer/ComplementaryMixer';
import CompoundMixer from './ColorMixer/CompoundMixer';
import MonochromaticMixer from './ColorMixer/MonochromaticMixer';
import TriadicMixer from './ColorMixer/TriadicMider';
import { ColorMixerOptions, PercentLevel } from './ColorMixer/types.d';
import Factor from './ColorMixer/utils/RandomFactor';
import {
  InvalidColorsQuantityError,
  InvalidParametersError,
} from './errors/PaletteFactory';
import Palette from './palette';
import {
  PaletteColorsLimit,
  PaletteEditionOptions,
  PaletteEditType,
  PaletteGenerationOptions,
  PaletteType,
} from './types';

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

    validatePaletteGeneration({
      colorsQuantity,
      lockedColors: lockedColors.length,
    });

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

  static getPaletteGenerator(type?: PaletteType): PaletteGenerator {
    switch (type) {
      case PaletteType.RANDOM:
        return PaletteFactory.generateRandomPalette;
      case PaletteType.MONOCHROMATIC:
        return PaletteFactory.generateMonochromaticPalette;
      case PaletteType.ANALOGOUS:
        return PaletteFactory.generateAnalogousPalette;
      case PaletteType.COMPLEMENTARY:
        return PaletteFactory.generateComplementaryPalette;
      case PaletteType.TRIADIC:
        return PaletteFactory.generateTriadicPalette;
      case PaletteType.COMPOUND:
        return PaletteFactory.generateCompoundPalette;
      default:
        return PaletteFactory.generateRandomPalette;
    }
  }

  private static generateMonochromaticPalette(
    colorsQuantity: number,
    generationOptions: PaletteGenerationOptions,
  ): Palette {
    const { lockedColors } = generationOptions;
    validatePaletteGeneration({
      colorsQuantity,
      lockedColors: lockedColors.length,
      needBaseColor: true,
    });

    const baseColor = lockedColors[0];

    const colorMixerOption: ColorMixerOptions = {
      baseColor,
      colorsQuantity,
    };

    const colorMixer = new MonochromaticMixer(colorMixerOption);

    const colors = colorMixer.generatePalette();

    return new Palette(colors);
  }

  private static generateAnalogousPalette(
    colorsQuantity: number,
    generationOptions: PaletteGenerationOptions,
  ): Palette {
    const { lockedColors } = generationOptions;
    validatePaletteGeneration({
      colorsQuantity,
      lockedColors: lockedColors.length,
      needBaseColor: true,
    });

    const baseColor = lockedColors[0];

    const colorMixerOption: ColorMixerOptions = {
      baseColor,
      colorsQuantity,
      luminosity: new Factor(0.9, PercentLevel.MEDIUM_HIGH),
      saturation: new Factor(0.9, PercentLevel.MEDIUM_HIGH),
    };

    const colorMixer = new AnalogousMixer(colorMixerOption);

    const colors = colorMixer.generatePalette();

    return new Palette(colors);
  }

  private static generateComplementaryPalette(
    colorsQuantity: number,
    generationOptions: PaletteGenerationOptions,
  ): Palette {
    const { lockedColors } = generationOptions;
    validatePaletteGeneration({
      colorsQuantity,
      lockedColors: lockedColors.length,
      needBaseColor: true,
    });

    const baseColor = lockedColors[0];

    const colorMixerOption: ColorMixerOptions = {
      baseColor,
      colorsQuantity,
      luminosity: new Factor(0.3),
      saturation: new Factor(0.5),
    };

    const colorMixer = new ComplementaryMixer(colorMixerOption);

    const colors = colorMixer.generatePalette();

    return new Palette(colors);
  }

  private static generateTriadicPalette(
    colorsQuantity: number,
    generationOptions: PaletteGenerationOptions,
  ): Palette {
    const { lockedColors } = generationOptions;
    validatePaletteGeneration({
      colorsQuantity,
      lockedColors: lockedColors.length,
      needBaseColor: true,
    });

    const baseColor = lockedColors[0];

    const colorMixerOption: ColorMixerOptions = {
      baseColor,
      colorsQuantity,
      luminosity: new Factor(0.3),
      saturation: new Factor(0.5),
    };

    const colorMixer = new TriadicMixer(colorMixerOption);

    const colors = colorMixer.generatePalette();

    return new Palette(colors);
  }

  private static generateCompoundPalette(
    colorsQuantity: number,
    generationOptions: PaletteGenerationOptions,
  ): Palette {
    const { lockedColors } = generationOptions;
    validatePaletteGeneration({
      colorsQuantity,
      lockedColors: lockedColors.length,
      needBaseColor: true,
    });

    const baseColor = lockedColors[0];

    const colorMixerOption: ColorMixerOptions = {
      baseColor,
      colorsQuantity,
      luminosity: new Factor(0.3),
      saturation: new Factor(0.5),
    };

    const colorMixer = new CompoundMixer(colorMixerOption);

    const colors = colorMixer.generatePalette();

    return new Palette(colors);
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
