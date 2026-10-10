import { FaArrowDown, FaArrowUp, FaCopy, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa6'

function ItemActions({ isFirst, isLast, onMove, onRemove, onDuplicate, hidden, onToggleHidden }) {
  return (
    <div className="item-actions">
      <button
        type="button"
        className="icon-btn"
        title="Move up"
        disabled={isFirst}
        onClick={() => onMove(-1)}
      >
        <FaArrowUp size={11} />
      </button>
      <button
        type="button"
        className="icon-btn"
        title="Move down"
        disabled={isLast}
        onClick={() => onMove(1)}
      >
        <FaArrowDown size={11} />
      </button>
      {onDuplicate && (
        <button type="button" className="icon-btn" title="Duplicate" onClick={onDuplicate}>
          <FaCopy size={11} />
        </button>
      )}
      {onToggleHidden && (
        <button
          type="button"
          className="icon-btn"
          title={hidden ? 'Show in resume' : 'Hide from resume'}
          onClick={onToggleHidden}
        >
          {hidden ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
        </button>
      )}
      <button type="button" className="icon-btn icon-btn--danger" title="Delete" onClick={onRemove}>
        <FaTrash size={11} />
      </button>
    </div>
  )
}

export default ItemActions
