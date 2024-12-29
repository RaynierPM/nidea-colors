import styles from './style.module.css';

type ControlPanelProps = {
  generateNewPalette: () => void;
};

export default function ControlPanel({
  generateNewPalette,
}: ControlPanelProps) {
  return (
    <header className={styles.controlPanel}>
      <h1>Nideo colors</h1>
      <div>
        <button onClick={generateNewPalette}>Generate new palette</button>
      </div>
    </header>
  );
}
