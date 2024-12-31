import Palette from 'core/palette';
import styles from './style.module.css';
import Tile from './Tile';
import Color from 'core/Color';
import { mapKey } from 'utils/GenerateColorKey';

type handleColorGenerator = (color: Color) => () => void;

type CanvasProps = {
  palette: Palette;
  lockedColors?: Color[];
  lockUnlockColorGenerator?: handleColorGenerator;
  addColor?: () => void;
  removeColor?: handleColorGenerator;
};

export default function Canvas({
  palette,
  lockedColors,
  lockUnlockColorGenerator,
  addColor,
  removeColor,
}: CanvasProps) {
  return (
    <main className={styles.canvas}>
      {palette.colors.map((color, index) => {
        const lastItem = index === palette.colors.length - 1;
        return (
          <Tile
            locked={lockedColors?.some(
              lockedColor => lockedColor.hexColor === color.hexColor,
            )}
            lockUnlock={lockUnlockColorGenerator?.(color)}
            color={color}
            removeColor={removeColor?.(color)}
            key={mapKey(color.hexColor, index)}
            addColor={lastItem ? addColor : undefined}
          />
        );
      })}
    </main>
  );
}
