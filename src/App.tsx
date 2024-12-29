import { useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import ControlPanel from './components/ControlPanel/ControlPanel';
import Palette from './core/palette';

function App() {
  const [palette, setPalette] = useState<Palette>(
    Palette.generateRandomPallete(4),
  );

  function generateNewPalette() {
    setPalette(Palette.generateRandomPallete(4));
  }

  return (
    <div className="app">
      <ControlPanel generateNewPalette={generateNewPalette} />
      <Canvas palette={palette} />
    </div>
  );
}

export default App;
