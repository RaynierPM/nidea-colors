import { toast } from 'sonner';
import { InvalidHexColorsJsonError } from '../core/errors/Palette';
import Palette from '../core/palette';
import { useEffect } from 'react';

export default function useGetPaletteFromParams(
  paletteCb: (palette: Palette) => void,
) {
  useEffect(() => {
    const path = window.location.pathname;
    const hexColors = path.split('/').slice(1);
    console.log(hexColors);
    let palette: Palette | null = null;
    try {
      const paletteJson = JSON.stringify({ colors: hexColors });
      palette = Palette.fromJson(paletteJson);
      paletteCb(palette);
    } catch (err) {
      if (err instanceof InvalidHexColorsJsonError) {
        toast.error('Invalid url, please check the format');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
