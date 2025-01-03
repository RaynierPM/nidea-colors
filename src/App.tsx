import { useCallback, useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Palette from './core/palette';
import { toast, Toaster } from 'sonner';
import useGetPaletteFromParams from './hooks/useGetPaletteFromParams';
import { getPaletteUrl } from './core/utils/paletteUrl';
import Color from 'core/Color';
import {
  InvalidColorsQuantityError,
  InvalidParametersError,
} from 'core/errors/PaletteFactory';
import PaletteFactory, { type PaletteGenerator } from 'core/PaletteFactory';
import {
  PaletteColorsLimit,
  PaletteGenerationOptions,
  PaletteType as PaletteType,
} from 'core/types';
import PreviewModal from 'components/PalettePreview/PreviewModal';
import { clearPaletteUrl } from 'utils/url';
import { getRandomColor } from 'core/utils/color';
import useShowPaletteSettings from 'hooks/useShowPaletteSettings';
import PaletteSettings from 'components/PaletteSettings';

const DEFAULT_PALETTE_TYPE = PaletteType.RANDOM;

function App() {
  const [paletteType, setPaletteType] =
    useState<PaletteType>(DEFAULT_PALETTE_TYPE);

  const paletteGenerator = useCallback<PaletteGenerator>(
    (cq: number, lo: PaletteGenerationOptions) => {
      try {
        return PaletteFactory.getPaletteGenerator(paletteType)(cq, lo);
      } catch (err) {
        if (err instanceof InvalidParametersError) {
          toast.error('Going back to random palette');
        }
        return PaletteFactory.getPaletteGenerator(PaletteType.RANDOM)(cq, lo);
      }
    },
    [paletteType],
  );

  const [lockedColors, setLockedColors] = useState<Color[]>([]);
  const [palette, setPalette] = useState<Palette>(
    paletteGenerator(4, { lockedColors }),
  );

  const paletteUrl = getPaletteUrl(palette);

  function generateNewPalette() {
    try {
      setPalette(paletteGenerator(palette.colors.length, { lockedColors }));
      clearPaletteUrl();
    } catch (err) {
      if (err instanceof InvalidColorsQuantityError) {
        toast.error(err.message);
      } else if (err instanceof InvalidParametersError) {
        toast.error(`Invalid colors parameters`);
      }
    }
  }

  function generateAddColor() {
    const len = palette.colors.length;
    if (len >= PaletteColorsLimit.MAX) {
      return;
    }
    return () => {
      palette.addColor(getRandomColor());
      setPalette(palette.clone());
    };
  }

  function RemoveColor(color: Color) {
    return () => {
      if (lockedColors.includes(color)) {
        lockUnlockColorGenerator(color)();
      }
      palette.removeColor(color);
      setPalette(palette.clone());
    };
  }

  function generateRemoveColor() {
    const len = palette.colors.length;
    if (len <= PaletteColorsLimit.MIN) {
      return;
    }
    return RemoveColor;
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

  const goBackToRamdom = useCallback(() => {
    setPaletteType(PaletteType.RANDOM);
  }, []);

  const { visible: showSettings } = useShowPaletteSettings(
    lockedColors,
    goBackToRamdom,
  );

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
          removeColor={generateRemoveColor()}
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
      <PaletteSettings
        generateNewPalette={generateNewPalette}
        changleScheme={setPaletteType}
        selectedScheme={paletteType}
        visible={showSettings}
      />
      <Toaster />
    </>
  );
}

export default App;
