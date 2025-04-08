import { useCallback, useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import ControlPanel from './components/ControlPanel/ControlPanel';
import { toast, Toaster } from 'sonner';
import useGetPaletteFromParams from './hooks/useGetPaletteFromParams';
import PreviewModal from 'components/PalettePreview/PreviewModal';
import { clearPaletteUrl } from 'utils/url';
import PaletteSettings from 'components/PaletteSettings';
import { Color, generatePaletteOptions, Palette, PaletteFactory, PaletteGenerator, PaletteType } from 'nidea-colors';
import { InvalidColorsQuantityError, InvalidParametersError } from 'nidea-colors/errors';
import { getRandomColor } from 'nidea-colors/utils';
import { paletteTypes } from 'utils/paletteType';
import { ColorGenerationLimits } from 'common/limits';

const DEFAULT_PALETTE_TYPE = PaletteType.RANDOM;

const default_limits: {min: number, max: number} = {
  min: ColorGenerationLimits.MIN,
  max: ColorGenerationLimits.MAX,
}

const DEFAULT_PALETTE = new PaletteFactory({limits: default_limits})
.getPaletteGenerator()({
  paletteType: DEFAULT_PALETTE_TYPE,
  lockedColors: [],
  colorsQuantity: 4,
});

function App() {
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);
  const [paletteOptions, setPaletteOptions] = useState<generatePaletteOptions>({
    paletteType: PaletteType.RANDOM,
    lockedColors: [],
    colorsQuantity: palette.colors.length,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paletteGenerator = useCallback<PaletteGenerator>(
    new PaletteFactory({limits: default_limits}).getPaletteGenerator(),
    [],
  );

  const goBackToRamdom = useCallback(() => {
    setPaletteOptions({ ...paletteOptions, paletteType: PaletteType.RANDOM });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateNewPalette() {
    try {
      setPalette(paletteGenerator(paletteOptions));
      clearPaletteUrl();
    } catch (err) {
      if (err instanceof InvalidColorsQuantityError) {
        toast.error(err.message);
      } else if (err instanceof InvalidParametersError) {
        toast.error('Going back to random palette');
        goBackToRamdom();
      }
    }
  }

  function generateAddColor() {
    const len = palette.colors.length;
    if (len >= default_limits.max) {
      return;
    }
    return () => {
      palette.addColor(getRandomColor());
      setPalette(palette.clone());
      setPaletteOptions({ ...paletteOptions, colorsQuantity: len + 1 });
    };
  }

  function RemoveColor(color: Color) {
    return () => {
      paletteOptions.lockedColors.forEach(lc => console.log(lc.hexColor));
      if (
        paletteOptions.lockedColors.some(lc => lc.hexColor === color.hexColor)
      ) {
        lockUnlockColorGenerator(color)();
      }
      palette.removeColor(color);
      setPalette(palette.clone());
      setPaletteOptions({
        ...paletteOptions,
        colorsQuantity: palette.colors.length,
      });
    };
  }

  function generateRemoveColor() {
    const len = palette.colors.length;
    if (len <= default_limits.min) {
      return;
    }
    return RemoveColor;
  }

  function paletteCb(palette: Palette) {
    setPalette(palette);
  }

  function lockUnlockColorGenerator(color: Color) {
    const { lockedColors } = paletteOptions;
    return function () {
      const index = lockedColors.findIndex(
        lockedColor => lockedColor.hexColor === color.hexColor,
      );
      if (index === -1) {
        setPaletteOptions({
          ...paletteOptions,
          lockedColors: [...lockedColors, color],
        });
      } else {
        setPaletteOptions({
          ...paletteOptions,
          lockedColors: lockedColors.filter(
            lockedColor => lockedColor.hexColor !== color.hexColor,
          ),
        });
      }
    };
  }
  const { previewPalette, previewVisible, handleClosePreviewPalette } =
    useGetPaletteFromParams();

  return (
    <>
      <div className="app">
        <ControlPanel
          paletteType={paletteTypes[paletteOptions.paletteType]}
          actualPalette={palette}
          generateNewPalette={generateNewPalette}
          setPalette={setPalette}
        />
        <Canvas
          lockedColors={paletteOptions.lockedColors}
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
        updateOptions={setPaletteOptions}
        options={paletteOptions}
        palette={palette}
      />
      <Toaster />
    </>
  );
}

export default App;
