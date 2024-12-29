import Color from 'core/Color';
import React, { useMemo, useState } from 'react';

type RandomColorTextProps = {
  text: string;
};

export default function RandomColorText({ text }: RandomColorTextProps) {
  const [letters] = useState<string[]>(getLetters(text));

  const titleElements = useMemo<React.ReactNode[]>(() => {
    return letters.map(letter => {
      const color = Color.generateRandomColor();
      return (
        <span key={color.hexColor} style={{ color: `#${color.hexColor}` }}>
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
