import Color from 'core/Color';
import { useMemo, useState } from 'react';

type RandomColorTextProps = {
  text: string;
};

export default function RandomColorText({ text }: RandomColorTextProps) {
  const [letters] = useState<string[]>(getLetters(text));

  const titleElements = useMemo(() => {
    return letters.map(letter => {
      const color = Color.generateRandomColor();
      return <span style={{ color: `#${color.hexColor}` }}>{letter}</span>;
    });
  }, [letters]);

  return <h1>{titleElements}</h1>;
}

function getLetters(text: string): string[] {
  return text.split('');
}
