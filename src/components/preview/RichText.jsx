// Minimal formatting: lines starting with "-", "*" or "•" become bullets,
// **text** becomes bold. Everything else is a paragraph.
const BULLET = /^\s*[-*•]\s+/

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  )
}

function RichText({ text, className = '' }) {
  const blocks = []
  for (const line of text.split('\n')) {
    if (!line.trim()) continue
    if (BULLET.test(line)) {
      const last = blocks.at(-1)
      const item = line.replace(BULLET, '')
      if (last?.type === 'list') last.items.push(item)
      else blocks.push({ type: 'list', items: [item] })
    } else {
      blocks.push({ type: 'p', text: line })
    }
  }
  if (blocks.length === 0) return null

  return (
    <div className={`cv-rich ${className}`}>
      {blocks.map((block, i) =>
        block.type === 'list' ? (
          <ul key={i} className="cv-bullets">
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item)}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{renderInline(block.text)}</p>
        ),
      )}
    </div>
  )
}

export default RichText
