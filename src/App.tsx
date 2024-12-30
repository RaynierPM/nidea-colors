import { useCallback, useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Palette from './core/palette';
import { toast, Toaster } from 'sonner';
import useGetPaletteFromParams from './hooks/useGetPaletteFromParams';
import { getPaletteUrl } from './core/utils/paletteUrl';
import useUpdateUrlByPalette from './hooks/useUpdateUrlByPalette';
import Color from 'core/Color';
import { InvalidColorsQuantityError } from 'core/errors/PaletteFactory';
import PaletteFactory, { type PaletteGenerator } from 'core/PaletteFactory';
import { PalleteGenerationType } from 'core/types';

function App() {
  const [paletteType] = useState<PalleteGenerationType>(
    PalleteGenerationType.RANDOM,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paletteGenerator = useCallback<PaletteGenerator>(
    PaletteFactory.getPaletteGenerator(paletteType),
    [paletteType],
  );

  const [lockedColors, setLockedColors] = useState<Color[]>([]);
  const [generatedByUser, setGeneratedByUser] = useState(false);
  const [palette, setPalette] = useState<Palette>(
    paletteGenerator(4, { lockedColors }),
  );

  const paletteUrl = getPaletteUrl(palette);

  function generateNewPalette() {
    try {
      setPalette(paletteGenerator(4, { lockedColors }));
      setGeneratedByUser(true);
    } catch (err) {
      if (err instanceof InvalidColorsQuantityError) {
        toast.error(`Can't generate palette with ${err.message}`);
      }
    }
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
  useUpdateUrlByPalette(palette, generatedByUser);
  useGetPaletteFromParams(paletteCb);

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
        />
      </div>
      <Toaster />
    </>
  );
}

export default App;
