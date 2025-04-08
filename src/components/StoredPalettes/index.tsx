import { Button, Drawer, Input, InputRef } from 'antd';
import styles from './style.module.css';
import usePaletteLocalStorage from 'hooks/usePaletteLocalStorage';
import PalettesContainer from './PalettesContainer';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';
import { Palette } from 'nidea-colors';

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
  const {
    removePalette,
    savePalette,
    storedPalettes,
    clearStoredPalettes,
    exportPalettes,
    importPalettes,
  } = usePaletteLocalStorage();

  const inputRef = useRef<InputRef>(null);
  const isStored = Boolean(storedPalettes[actualPalette.id]);

  function handleRemovePalette() {
    removePalette(actualPalette);
  }

  function handleSavePalette() {
    savePalette(actualPalette);
  }

  async function handleImportPalettes(event: ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files?.[0];
      if (file?.type === 'application/json') {
        const text = await file.text();
        const palettes = JSON.parse(text);
        importPalettes(palettes);
      } else {
        toast.error('Invalid file');
      }
    } catch {
      toast.error('Error importing palettes');
    }
  }

  function handleImportPalettesClick() {
    inputRef.current?.input?.click();
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

      <hr style={{ marginTop: '10px' }} />

      <div className={styles.buttons}>
        {Boolean(Object.values(storedPalettes).length) && (
          <Button className={styles.button} onClick={exportPalettes}>
            Export <i className="bi bi-download" />
          </Button>
        )}
        <Button className={styles.button} onClick={handleImportPalettesClick}>
          Import <i className="bi bi-upload" />
        </Button>
      </div>
      <Input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        value={''}
        accept=".json"
        onChange={handleImportPalettes}
      />
    </Drawer>
  );
}
