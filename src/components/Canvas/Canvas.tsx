import Palette from 'core/palette';
import styles from './style.module.css';
import Tile from './Tile';
import Color from 'core/Color';

type LocUnlockColorGenerator = (color: Color) => () => void;

type CanvasProps = {
  palette: Palette;
  lockedColors: Color[];
  lockUnlockColorGenerator: LocUnlockColorGenerator;
};

export default function Canvas({
  palette,
  lockedColors,
  lockUnlockColorGenerator,
}: CanvasProps) {
  return (
    <main className={styles.canvas}>
      {palette.colors.map(color => (
        <Tile
          lockUnlock={lockUnlockColorGenerator(color)}
          locked={lockedColors.includes(color)}
          color={color}
          key={color.hexColor}
        />
      ))}
    </main>
  );
}
