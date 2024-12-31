import { getRandomColor } from 'core/utils/color';
import React, { useMemo, useState } from 'react';
import { mapKey } from 'utils/GenerateColorKey';

type RandomColorTextProps = {
  text: string;
};

export default function RandomColorText({ text }: RandomColorTextProps) {
  const [letters] = useState<string[]>(getLetters(text));

  const titleElements = useMemo<React.ReactNode[]>(() => {
    return letters.map((letter, index) => {
      const color = getRandomColor();
      return (
        <span
          key={mapKey(letter, index)}
          style={{ color: `#${color.hexColor}` }}>
          {letter}
        </span>
      );
    });
  }, [letters]);

  return <h1>{titleElements}</h1>;
}

function getLetters(text: string): string[] {
  return text.split('');
}
