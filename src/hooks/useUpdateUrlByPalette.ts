import { useEffect } from 'react';
import Palette from '../core/palette';
import { getPaletteUrl } from '../core/utils/paletteUrl';

export default function useUpdateUrlByPalette(
  palette: Palette,
  updateUrl: boolean = false,
) {
  useEffect(() => {
    if (!updateUrl) {
      return;
    }

    const paletteUrl = getPaletteUrl(palette);
    window.history.pushState(null, '', paletteUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette]);
}
