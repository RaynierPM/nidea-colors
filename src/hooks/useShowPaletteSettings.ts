import Color from 'core/Color';
import { useEffect, useState } from 'react';

export default function useShowPaletteSettings(
  lockedColors: Color[],
  goBackToRamdom: () => void,
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lockedColors.length === 1) {
      setVisible(true);
    } else {
      setVisible(false);
      goBackToRamdom();
    }
  }, [lockedColors, goBackToRamdom]);

  return {
    visible,
  };
}
