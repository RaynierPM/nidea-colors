import Canvas from './components/Canvas/Canvas';
import Palette from './core/palette';

function App() {
  return (
    <div className="app">
      Nidea-colorcito
      <Canvas palette={Palette.generateRandomPallete(4)} />
    </div>
  );
}

export default App;
