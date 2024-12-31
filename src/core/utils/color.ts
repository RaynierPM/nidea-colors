import { ColorFactory } from 'core/PaletteFactory';
import { PaletteGenerationType } from 'core/types';

export function getRandomColor() {
  return ColorFactory.getColor({ type: PaletteGenerationType.RANDOM });
}
