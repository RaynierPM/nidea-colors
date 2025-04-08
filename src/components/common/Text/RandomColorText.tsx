import { PaletteType } from 'nidea-colors';
import { Factor, MonochromaticMixer } from 'nidea-colors/ColorMixer';
import React, { useEffect, useMemo, useState } from 'react';
import { mapKey } from 'utils/GenerateColorKey';
import {ColorMixerOptions} from 'nidea-colors/ColorMixer'
import { getRandomColor } from 'nidea-colors/utils';

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
      luminosity: new Factor(0.5, 0.5),
      saturation: new Factor(0.4, 0.6),
    };
    const colors = new MonochromaticMixer(options).generateColors();

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
