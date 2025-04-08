import Canvas from 'components/Canvas/Canvas';
import { Palette } from 'nidea-colors';

export default function Preview({ palette }: { palette: Palette }) {
  return <Canvas palette={palette} />;
}
