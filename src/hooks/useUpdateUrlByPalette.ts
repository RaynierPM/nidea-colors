import { useEffect } from 'react';
import Palette from '../core/palette';
import { getPaletteUrl } from '../core/utils/paletteUrl';

export default function useUpdateUrlByPalette(palette: Palette) {
  useEffect(() => {
    const paletteUrl = getPaletteUrl(palette);
    window.history.pushState(null, '', paletteUrl);
  }, [palette]);
}
