import { PaletteType } from 'core/types';
import { ColorMixerOptions } from '../types';
import ColorMixerI from '../interface/ColorMixer';
import RandomMixer from '../RandomMixer';
import MonochromaticMixer from '../MonochromaticMixer';
import AnalogousMixer from '../AnalogousMixer';
import ComplementaryMixer from '../ComplementaryMixer';
import TriadicMixer from '../TriadicMider';
import CompoundMixer from '../CompoundMixer';

export function getColorMixer({
  type,
  options,
}: {
  type: PaletteType;
  options: ColorMixerOptions;
}): ColorMixerI {
  switch (type) {
    case PaletteType.RANDOM:
      return new RandomMixer(options);
    case PaletteType.MONOCHROMATIC:
      return new MonochromaticMixer(options);
    case PaletteType.ANALOGOUS:
      return new AnalogousMixer(options);
    case PaletteType.COMPLEMENTARY:
      return new ComplementaryMixer(options);
    case PaletteType.TRIADIC:
      return new TriadicMixer(options);
    case PaletteType.COMPOUND:
      return new CompoundMixer(options);
    default:
      return new RandomMixer(options);
  }
}
