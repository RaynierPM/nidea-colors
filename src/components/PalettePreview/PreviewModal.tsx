import ModalComponent from 'components/common/modal/Modal';
import Preview from './Preview';
import styles from './styles.module.css';
import { Button, Divider } from 'antd';
import { Palette } from 'nidea-colors';

type PreviewModalProps = {
  palette: Palette;
  showModal: boolean;
  setPalette: (palette: Palette) => void;
  closePreview: () => void;
};

export default function PreviewModal({
  palette,
  showModal,
  setPalette,
  closePreview,
}: PreviewModalProps) {
  function handleOpenPalette() {
    if (palette) {
      setPalette(palette);
    }
    closePreview();
  }

  return (
    <ModalComponent
      visible={Boolean(showModal && palette)}
      onClose={closePreview}
      title="Hey, that's a preview">
      <p>A friend shared your this palette, check it out!!!</p>
      <Divider />
      <div className={styles.previewContainer}>
        <Preview palette={palette} />
      </div>
      <Divider />

      <div className={styles.actions}>
        <Button onClick={handleOpenPalette}>Expand it!! 🎨</Button>
      </div>
    </ModalComponent>
  );
}
