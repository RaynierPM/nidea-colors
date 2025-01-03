import MonochromaticMixer from 'core/ColorMixer/MonochromaticMixer';
import { ColorMixerOptions, PercentLevel } from 'core/ColorMixer/types.d';
import Factor from 'core/ColorMixer/utils/RandomFactor';
import { PaletteType } from 'core/types';
import { getRandomColor } from 'core/utils/color';
import React, { useEffect, useMemo, useState } from 'react';
import { mapKey } from 'utils/GenerateColorKey';

type RandomColorTextProps = {
  text: string;
  colorType?: PaletteType;
};

export default function RandomColorText({ text }: RandomColorTextProps) {
  const [letters, setLetters] = useState<string[]>(getLetters(text));

  useEffect(() => {
    setLetters(getLetters(text));
  }, [text]);

  const titleElements = useMemo<React.ReactNode[]>(() => {
    const len = letters.length;

    const options: ColorMixerOptions = {
      baseColor: getRandomColor(),
      colorsQuantity: len,
      luminosity: new Factor(0.5, PercentLevel.ABSOLUTE),
      saturation: new Factor(0.2),
    };
    const colors = new MonochromaticMixer(options).generatePalette();

    return letters.map((letter, index) => {
      const color = colors[index];
      return (
        <span
          key={mapKey(color.hexColor, index)}
          style={{ color: `#${color.hexColor}` }}
        >
          {letter}
        </span>
      );
    });
  }, [letters]);

  return titleElements;
}

function getLetters(text: string): string[] {
  return text.split('');
}
