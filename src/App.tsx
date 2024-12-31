import { useCallback, useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Palette from './core/palette';
import { toast, Toaster } from 'sonner';
import useGetPaletteFromParams from './hooks/useGetPaletteFromParams';
import { getPaletteUrl } from './core/utils/paletteUrl';
import Color from 'core/Color';
import { InvalidColorsQuantityError } from 'core/errors/PaletteFactory';
import PaletteFactory, { type PaletteGenerator } from 'core/PaletteFactory';
import {
  PaletteColorsLimit,
  PaletteGenerationType as PaletteGenerationType,
} from 'core/types';
import PreviewModal from 'components/PalettePreview/PreviewModal';
import { clearPaletteUrl } from 'utils/url';
import { getRandomColor } from 'core/utils/color';

function App() {
  const [paletteType] = useState<PaletteGenerationType>(
    PaletteGenerationType.RANDOM,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paletteGenerator = useCallback<PaletteGenerator>(
    PaletteFactory.getPaletteGenerator(paletteType),
    [paletteType],
  );

  const [lockedColors, setLockedColors] = useState<Color[]>([]);
  const [palette, setPalette] = useState<Palette>(
    paletteGenerator(4, { lockedColors }),
  );

  const paletteUrl = getPaletteUrl(palette);

  function generateNewPalette() {
    try {
      setPalette(paletteGenerator(4, { lockedColors }));
      clearPaletteUrl();
    } catch (err) {
      if (err instanceof InvalidColorsQuantityError) {
        toast.error(`Can't generate palette with ${err.message}`);
      }
    }
  }

  function generateAddColor() {
    const len = palette.colors.length;
    if (len >= PaletteColorsLimit.MAX || len <= PaletteColorsLimit.MIN) {
      return;
    }
    return () => {
      palette.addColor(getRandomColor());
      setPalette(palette.clone());
    };
  }

  function paletteCb(palette: Palette) {
    setPalette(palette);
  }

  function lockUnlockColorGenerator(color: Color) {
    return function () {
      const index = lockedColors.findIndex(
        lockedColor => lockedColor.hexColor === color.hexColor,
      );
      if (index === -1) {
        setLockedColors([...lockedColors, color]);
      } else {
        setLockedColors(
          lockedColors.filter(
            lockedColor => lockedColor.hexColor !== color.hexColor,
          ),
        );
      }
    };
  }
  const { previewPalette, previewVisible, handleClosePreviewPalette } =
    useGetPaletteFromParams();

  return (
    <>
      <div className="app">
        <ControlPanel
          paletteUrl={paletteUrl}
          generateNewPalette={generateNewPalette}
        />
        <Canvas
          lockedColors={lockedColors}
          lockUnlockColorGenerator={lockUnlockColorGenerator}
          palette={palette}
          addColor={generateAddColor()}
        />
        {previewPalette && (
          <PreviewModal
            showModal={previewVisible}
            setPalette={paletteCb}
            palette={previewPalette}
            closePreview={handleClosePreviewPalette}
          />
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;
