import Color from 'core/Color';
import Label from './Label';
import styles from './style.module.css';

type TileProps = {
  color: Color;
};

export default function Tile({ color }: TileProps) {
  return (
    <div
      className={styles.tile}
      style={{ backgroundColor: `#${color.hexColor}` }}>
      <Label text={`#${color.hexColor}`} />
    </div>
  );
}
