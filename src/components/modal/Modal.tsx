import { Modal } from 'antd';

type ModalComponentProps = {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  title: string;
};

export default function ModalComponent({
  children,
  visible,
  onClose,
  title,
}: ModalComponentProps) {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title={title}
      footer={null}
      centered
      width={500}>
      {children}
    </Modal>
  );
}
