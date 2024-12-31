import Canvas from 'components/Canvas/Canvas';
import Palette from 'core/palette';

export default function Preview({ palette }: { palette: Palette }) {
  return <Canvas palette={palette} />;
}
