import Palette from 'core/palette';
import { PaletteGenerationOptions } from 'core/PaletteFactory';

export default class ColorMixer {
  generateMonochromaticPalette(options: PaletteGenerationOptions): Palette {
    console.log(options);
    return new Palette();
  }
}
