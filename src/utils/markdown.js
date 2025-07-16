export default function parseMarkdown(md) {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // code blocks
    .replace(/```([\s\S]*?)```/g, (_, code) => {
      return '<pre><code>' + code + '</code></pre>'
    })
    // headings
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    // bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')

  // lists
  html = html.replace(/(?:^|\n)-(.*(?:\n-.*)*)/g, match => {
    const items = match
      .trim()
      .split(/\n-/)
      .map(s => '<li>' + s.replace(/^\-?\s*/, '') + '</li>')
      .join('')
    return '<ul>' + items + '</ul>'
  })

  // paragraphs and line breaks
  html = html.replace(/\n{2,}/g, '</p><p>')
  html = html.replace(/\n/g, '<br>')
  html = '<p>' + html + '</p>'
  html = html.replace(/<p><\/p>/g, '')
  return html
}
