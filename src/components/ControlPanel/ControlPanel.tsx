import { Button } from 'antd';
import styles from './style.module.css';
import SharePaletteModal from './functions/SharePaletteModal';
import { useState } from 'react';

type ControlPanelProps = {
  paletteUrl: string;
  generateNewPalette: () => void;
};

export default function ControlPanel({
  paletteUrl,
  generateNewPalette,
}: ControlPanelProps) {
  const [visible, setVisible] = useState(false);

  function closeModal() {
    setVisible(false);
  }

  function openModal() {
    setVisible(true);
  }

  return (
    <header className={styles.controlPanel}>
      <h1>Nidea colors</h1>
      <div className={styles.buttons}>
        <Button onClick={openModal}>
          <i className="bi-share" />
        </Button>
        <Button onClick={generateNewPalette}>Generate new palette</Button>
      </div>
      <SharePaletteModal
        palettUrl={paletteUrl}
        visible={visible}
        onClose={closeModal}
      />
    </header>
  );
}
