import CopyField from 'components/common/copy/CopyField';
import ModalComponent from 'components/common/modal/Modal';

type SharePaletteModalProps = {
  visible: boolean;
  onClose: () => void;
  palettUrl: string;
};

export default function SharePaletteModal({
  visible,
  onClose,
  palettUrl,
}: SharePaletteModalProps) {
  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      title="Share Your Color Palette!">
      <p>
        Copy the link below and share this palette with anyone you'd like.
      </p>
      <CopyField text={palettUrl} />
    </ModalComponent>
  );
}
