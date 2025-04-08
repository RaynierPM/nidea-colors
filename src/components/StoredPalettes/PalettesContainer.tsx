import { Tooltip } from 'antd';
import styles from './style.module.css';
import Canvas from 'components/Canvas/Canvas';
import { Palette } from 'nidea-colors';

type Props = {
  palettes: Palette[];
  setPalette: (palette: Palette) => void;
};

export default function PalettesContainer({ palettes, setPalette }: Props) {
  function handlePaletteClick(palette: Palette) {
    return () => setPalette(palette);
  }

  return (
    <div className={styles.paletteContainer}>
      {palettes.map(palette => (
        <Tooltip title="Click to open palette" key={palette.id}>
          <div
            className={styles.palette}
            key={palette.id}
            onClick={handlePaletteClick(palette)}
          >
            <Canvas showLabel={false} palette={palette} />
          </div>
        </Tooltip>
      ))}
    </div>
  );
}
