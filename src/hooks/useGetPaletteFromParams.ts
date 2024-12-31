import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import Palette from 'core/palette';
import { InvalidHexColorsJsonError } from 'core/errors/Palette';

export default function useGetPaletteFromParams() {
  const [visible, setVisible] = useState(false);
  const [palette, setPalette] = useState<Palette | null>(null);

  function handleClosePreviewPalette() {
    setVisible(false);
  }

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/shared')) {
      const hexColors = path.split('/').slice(2);

      const notValidUrl = hexColors[0] === '';
      if (notValidUrl) {
        return;
      }

      try {
        const paletteJson = JSON.stringify({ colors: hexColors });
        setPalette(Palette.fromJson(paletteJson));
        setVisible(true);
      } catch (err) {
        if (err instanceof InvalidHexColorsJsonError) {
          toast.error('Invalid url, please check the format');
        }
      }
    }
  }, []);

  return {
    previewVisible: visible,
    handleClosePreviewPalette,
    previewPalette: palette,
  };
}
