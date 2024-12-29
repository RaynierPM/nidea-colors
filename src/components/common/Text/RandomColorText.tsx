import Color from 'core/Color';
import { useState } from 'react';

type RandomColorTextProps = {
  text: string;
};

export default function RandomColorText({ text }: RandomColorTextProps) {
  const [letters] = useState<string[]>(getLetters(text));

  return (
    <h1>
      {letters.map(letter => {
        const color = Color.generateRandomColor();
        return <span style={{ color: `#${color.hexColor}` }}>{letter}</span>;
      })}
    </h1>
  );
}

function getLetters(text: string): string[] {
  return text.split('');
}
