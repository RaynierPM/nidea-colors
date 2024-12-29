import Palette from '../../core/palette';
import styles from './style.module.css';
import Tile from './Tile';

type CanvasProps = {
  palette: Palette;
};

export default function Canvas({ palette }: CanvasProps) {
  return (
    <main className={styles.canvas}>
      {palette.colors.map(color => (
        <Tile color={color} key={color.hexColor} />
      ))}
    </main>
  );
}
