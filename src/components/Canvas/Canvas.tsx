import { Color, Palette } from 'nidea-colors';
import styles from './style.module.css';
import Tile from './Tile';
import { mapKey } from 'utils/GenerateColorKey';

type handleColorGenerator = (color: Color) => () => void;

type CanvasProps = {
  palette: Palette;
  lockedColors?: Color[];
  lockUnlockColorGenerator?: handleColorGenerator;
  addColor?: () => void;
  removeColor?: handleColorGenerator;
  showLabel?: boolean;
};

export default function Canvas({
  palette,
  addColor,
  removeColor,
  showLabel = true,
}: CanvasProps) {
  return (
    <main className={styles.canvas}>
      {palette.colors.map((color, index) => {
        const lastItem = index === palette.colors.length - 1;
        return (
          <Tile
            color={color}
            removeColor={removeColor?.(color)}
            key={mapKey(color.hexColor, index)}
            addColor={lastItem ? addColor : undefined}
            showLabel={showLabel}
          />
        );
      })}
    </main>
  );
}
