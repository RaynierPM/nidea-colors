import Palette from 'core/palette';
import styles from './style.module.css';
import Tile from './Tile';
import Color from 'core/Color';
import { mapKey } from 'utils/GenerateColorKey';

type LocUnlockColorGenerator = (color: Color) => () => void;

type CanvasProps = {
  palette: Palette;
  lockedColors?: Color[];
  lockUnlockColorGenerator?: LocUnlockColorGenerator;
  addColor?: () => void;
};

export default function Canvas({
  palette,
  lockedColors,
  lockUnlockColorGenerator,
  addColor,
}: CanvasProps) {
  return (
    <main className={styles.canvas}>
      {palette.colors.map((color, index) => {
        const lastItem = index === palette.colors.length - 1;
        return (
          <Tile
            lockUnlock={lockUnlockColorGenerator?.(color)}
            locked={lockedColors?.includes(color)}
            color={color}
            key={mapKey(color.hexColor, index)}
            addColor={lastItem ? addColor : undefined}
          />
        );
      })}
    </main>
  );
}
