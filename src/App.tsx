import { useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Palette from './core/palette';
import { Toaster } from 'sonner';
import useGetPaletteFromParams from './hooks/useGetPaletteFromParams';
import { getPaletteUrl } from './core/utils/paletteUrl';

function App() {
  const [palette, setPalette] = useState<Palette>(
    Palette.generateRandomPallete(4),
  );

  const paletteUrl = getPaletteUrl(palette);

  function paletteCb(palette: Palette) {
    setPalette(palette);
  }

  function generateNewPalette() {
    setPalette(Palette.generateRandomPallete(4));
  }

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
