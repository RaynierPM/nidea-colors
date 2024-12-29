import { useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Palette from './core/palette';
import { Toaster } from 'sonner';
import useGetPaletteFromParams from './hooks/useGetPaletteFromParams';
import { getPaletteUrl } from './core/utils/paletteUrl';
import useUpdateUrlByPalette from './hooks/useUpdateUrlByPalette';

function App() {
  const [generatedByUser, setGeneratedByUser] = useState(false);
  const [palette, setPalette] = useState<Palette>(
    Palette.generateRandomPallete(4),
  );

  const paletteUrl = getPaletteUrl(palette);

  function generateNewPalette() {
    setPalette(Palette.generateRandomPallete(4));
    setGeneratedByUser(true);
  }

  function paletteCb(palette: Palette) {
    setPalette(palette);
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
        <Canvas palette={palette} />
      </div>
      <Toaster />
    </>
  );
}

export default App;
