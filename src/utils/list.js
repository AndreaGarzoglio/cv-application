export const uid = () => crypto.randomUUID()

export function updateItem(list, id, patch) {
  return list.map((item) => (item.id === id ? { ...item, ...patch } : item))
}

export function removeItem(list, id) {
  return list.filter((item) => item.id !== id)
}

export function moveItem(list, id, direction) {
  const index = list.findIndex((item) => item.id === id)
  const target = index + direction
  if (index === -1 || target < 0 || target >= list.length) return list
  const next = [...list]
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}
