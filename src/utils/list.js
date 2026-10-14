export const uid = () => crypto.randomUUID()

export function updateItem(list, id, patch) {
  return list.map((item) => (item.id === id ? { ...item, ...patch } : item))
}

export function removeItem(list, id) {
  return list.filter((item) => item.id !== id)
}

export function duplicateItem(list, id) {
  const index = list.findIndex((item) => item.id === id)
  if (index === -1) return list
  const copy = { ...structuredClone(list[index]), id: uid() }
  return [...list.slice(0, index + 1), copy, ...list.slice(index + 1)]
}

export function swapAt(list, index, direction) {
  const next = [...list]
  ;[next[index], next[index + direction]] = [next[index + direction], next[index]]
  return next
}

export function moveItem(list, id, direction) {
  const index = list.findIndex((item) => item.id === id)
  const target = index + direction
  if (index === -1 || target < 0 || target >= list.length) return list
  return swapAt(list, index, direction)
}

// Edit, move and delete handlers for the row at `index`, ready for ItemActions.
export function rowProps(list, index, onChange) {
  const { id } = list[index]
  return {
    isFirst: index === 0,
    isLast: index === list.length - 1,
    onChange: (patch) => onChange(updateItem(list, id, patch)),
    onMove: (dir) => onChange(moveItem(list, id, dir)),
    onRemove: () => onChange(removeItem(list, id)),
  }
}
