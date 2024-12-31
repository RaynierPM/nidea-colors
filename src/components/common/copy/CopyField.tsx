import { Button } from 'antd';
import styles from './style.module.css';
import { copyToClipboard } from 'components/utils/copyToClipboard';

type CopyFieldProps = {
  text: string;
};

export default function CopyField({ text }: CopyFieldProps) {
  function handleCopy() {
    copyToClipboard(text);
  }

  return (
    <div className={styles.clipboard}>
      <p>{text}</p>
      <Button onClick={handleCopy} className={styles.copyButton}>
        <i className="bi-clipboard" />
      </Button>
    </div>
  );
}
