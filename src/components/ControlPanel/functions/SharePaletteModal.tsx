import CopyField from 'components/common/copy/CopyField';
import ModalComponent from 'components/modal/Modal';

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
        You have a beautiful palette, and now it's time to let others enjoy it
        too! Copy the link below and share it with your friends, colleagues, or
        on social media. Inspire creativity and let your colors shine! 🎨
      </p>
      <CopyField text={palettUrl} />
    </ModalComponent>
  );
}
