import { Button, Drawer } from 'antd';
import styles from './style.module.css';
import usePaletteLocalStorage from 'hooks/usePaletteLocalStorage';
import Palette from 'core/palette';
import PalettesContainer from './PalettesContainer';

type props = {
  visible: boolean;
  onClose: () => void;
  actualPalette: Palette;
  setPalette: (palette: Palette) => void;
};

export default function StoredPalettesSettings({
  visible,
  onClose,
  actualPalette,
  setPalette,
}: props) {
  const { removePalette, savePalette, storedPalettes, clearStoredPalettes } =
    usePaletteLocalStorage();

  const isStored = Boolean(storedPalettes[actualPalette.id]);

  function handleRemovePalette() {
    removePalette(actualPalette);
  }

  function handleSavePalette() {
    savePalette(actualPalette);
  }

  return (
    <Drawer
      open={visible}
      onClose={onClose}
      title={
        <p>
          Stored palettes <i className="bi bi-floppy" />
        </p>
      }
      placement="right"
    >
      <div className={styles.storedPalettesSettings}>
        <PalettesContainer
          palettes={Object.values(storedPalettes)}
          setPalette={setPalette}
        />
      </div>
      <div className={styles.buttons}>
        {isStored ? (
          <Button className={styles.button} onClick={handleRemovePalette}>
            Remove palette <i className="bi bi-x-circle" />
          </Button>
        ) : (
          <Button className={styles.button} onClick={handleSavePalette}>
            Save palette <i className="bi bi-floppy" />
          </Button>
        )}
        {Boolean(Object.values(storedPalettes).length) && (
          <Button
            className={styles.button}
            onClick={clearStoredPalettes}
            variant="solid"
            color="danger"
          >
            Clear <i className="bi bi-trash" />
          </Button>
        )}
      </div>
    </Drawer>
  );
}
