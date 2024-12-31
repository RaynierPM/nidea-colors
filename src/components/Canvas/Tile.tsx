import Color from 'core/Color';
import TileActions from './TileActions';
import styles from './style.module.css';
import { Actions } from './type';

type TileProps = {
  color: Color;
  locked?: boolean;
  lockUnlock?: () => void;
  addColor?: () => void;
  removeColor?: () => void;
};

export default function Tile({
  color,
  locked,
  lockUnlock,
  addColor,
  removeColor,
}: TileProps) {
  const actions = getActions({
    lockUnlock,
    locked,
    removeColor,
  });

  return (
    <div
      className={styles.tile}
      style={{ backgroundColor: `#${color.hexColor}` }}>
      <TileActions actions={actions} copyableText={`#${color.hexColor}`} />
      {addColor && (
        <div className={styles.addColorAction} onClick={addColor}>
          <i className="bi bi-plus-circle" />
        </div>
      )}
    </div>
  );
}

type GetActionsOptions = {
  lockUnlock?: () => void;
  locked?: boolean;
  removeColor?: () => void;
};

function getActions({
  lockUnlock,
  locked,
  removeColor,
}: GetActionsOptions): Actions[] {
  const actions: Actions[] = [];

  if (removeColor) {
    actions.push({
      action: removeColor,
      icon: 'bi bi-trash',
      tooltip: 'Remove color',
    });
  }

  if (lockUnlock) {
    actions.push({
      action: lockUnlock,
      icon: `bi bi-${locked ? 'lock-fill' : 'unlock-fill'}`,
      tooltip: locked ? 'Unlock color' : 'Lock color',
    });
  }

  return actions;
}
