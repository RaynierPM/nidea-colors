import { toast } from 'sonner';
import { useEffect } from 'react';
import Palette from 'core/palette';
import { InvalidHexColorsJsonError } from 'core/errors/Palette';

export default function useGetPaletteFromParams(
  paletteCb: (palette: Palette) => void,
) {
  useEffect(() => {
    const path = window.location.pathname;
    const hexColors = path.split('/').slice(1);

    const notValidUrl = hexColors[0] === '';
    if (notValidUrl) {
      return;
    }

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
