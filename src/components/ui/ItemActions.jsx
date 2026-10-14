import { FaArrowDown, FaArrowUp, FaCopy, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa6'
import IconButton from './IconButton.jsx'

function ItemActions({ isFirst, isLast, onMove, onRemove, onDuplicate, hidden, onToggleHidden }) {
  return (
    <div className="item-actions">
      <IconButton title="Move up" disabled={isFirst} onClick={() => onMove(-1)}>
        <FaArrowUp size={11} />
      </IconButton>
      <IconButton title="Move down" disabled={isLast} onClick={() => onMove(1)}>
        <FaArrowDown size={11} />
      </IconButton>
      {onDuplicate && (
        <IconButton title="Duplicate" onClick={onDuplicate}>
          <FaCopy size={11} />
        </IconButton>
      )}
      {onToggleHidden && (
        <IconButton title={hidden ? 'Show in resume' : 'Hide from resume'} onClick={onToggleHidden}>
          {hidden ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
        </IconButton>
      )}
      <IconButton className="icon-btn--danger" title="Delete" onClick={onRemove}>
        <FaTrash size={11} />
      </IconButton>
    </div>
  )
}

export default ItemActions
