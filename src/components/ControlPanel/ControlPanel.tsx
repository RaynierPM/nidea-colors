import { Button, Tooltip } from 'antd';
import styles from './style.module.css';
import SharePaletteModal from './functions/SharePaletteModal';
import { useState } from 'react';
import RandomColorText from 'components/common/Text/RandomColorText';
import StoredPalettesSettings from 'components/StoredPalettes';
import { Palette } from 'nidea-colors';
import { getPaletteUrl } from 'utils/paletteUrl';

const pageTitle = 'Nidea colors';

type ControlPanelProps = {
  generateNewPalette: () => void;
  paletteType: string;
  actualPalette: Palette;
  setPalette: (palette: Palette) => void;
};

export default function ControlPanel({
  generateNewPalette,
  paletteType,
  actualPalette,
  setPalette,
}: ControlPanelProps) {
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleStored, setVisibleStored] = useState(false);

  function closeModal(dispatcher: (visible: boolean) => void) {
    return () => {
      dispatcher(false);
    };
  }

  function openModal(dispatcher: (visible: boolean) => void) {
    return () => {
      dispatcher(true);
    };
  }

  const paletteUrl = getPaletteUrl(actualPalette);

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
        <Button onClick={openModal(setVisibleStored)}>
          <i className="bi bi-floppy" />
        </Button>
        <Button onClick={openModal(setVisibleShare)}>
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
        visible={visibleShare}
        onClose={closeModal(setVisibleShare)}
      />
      <StoredPalettesSettings
        setPalette={setPalette}
        actualPalette={actualPalette}
        visible={visibleStored}
        onClose={closeModal(setVisibleStored)}
      />
    </header>
  );
}
