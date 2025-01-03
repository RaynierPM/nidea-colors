import { Button, Tooltip } from 'antd';
import styles from './style.module.css';
import SharePaletteModal from './functions/SharePaletteModal';
import { useState } from 'react';
import RandomColorText from 'components/common/Text/RandomColorText';

const pageTitle = 'Nidea colors';

type ControlPanelProps = {
  paletteUrl: string;
  generateNewPalette: () => void;
  paletteType: string;
};

export default function ControlPanel({
  paletteUrl,
  generateNewPalette,
  paletteType,
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
      <div className={styles.titleContainer}>
        <h1>
          <RandomColorText text={pageTitle} />
        </h1>
        <p>
          <RandomColorText text={paletteType} />
        </p>
      </div>
      <div className={styles.buttons}>
        <Button onClick={openModal}>
          <i className="bi-share" />
        </Button>
        <Tooltip title="Generate new palette">
          <Button onClick={generateNewPalette}>
            <i className="bi bi-arrow-repeat" />
          </Button>
        </Tooltip>
      </div>
      <SharePaletteModal
        palettUrl={paletteUrl}
        visible={visible}
        onClose={closeModal}
      />
    </header>
  );
}
