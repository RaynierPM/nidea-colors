import { useState } from 'react';
import styles from './style.module.css';
import DrawerComponent from 'components/common/drawer/Drawer';

type PaletteSettingsProps = {
  visible: boolean;
};

export default function PaletteSettings({ visible }: PaletteSettingsProps) {
  const [visibleSettings, setVisibleSettings] = useState(false);

  function handleClose() {
    setVisibleSettings(false);
  }

  function handleOpen() {
    setVisibleSettings(true);
  }

  return (
    <>
      {visible && (
        <div className={styles.settingsButton} onClick={handleOpen}>
          <i className="bi bi-gear-fill" />
        </div>
      )}
      <DrawerComponent
        open={visibleSettings}
        onClose={handleClose}
        title="Palette Settings">
        <div>Hello</div>
      </DrawerComponent>
    </>
  );
}
