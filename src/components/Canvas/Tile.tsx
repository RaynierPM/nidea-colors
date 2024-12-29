import Color from 'core/Color';
import TileActions from './TileActions';
import styles from './style.module.css';

type TileProps = {
  color: Color;
  locked: boolean;
  lockUnlock: () => void;
};

export default function Tile({ color, locked, lockUnlock }: TileProps) {
  return (
    <div
      className={styles.tile}
      style={{ backgroundColor: `#${color.hexColor}` }}>
      <TileActions
        locked={locked}
        lockUnlock={lockUnlock}
        text={`#${color.hexColor}`}
      />
    </div>
  );
}
