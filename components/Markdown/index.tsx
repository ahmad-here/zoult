import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

/** Renders the small markdown subset used by articles: ##/###, paragraphs, lists, **bold**, [links](/path). */

export const slugifyHeading = (text: string) =>
  text.toLowerCase().replace(/\*\*/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const key = `${keyBase}-${i++}`
    if (m[1]) out.push(<strong key={key}>{m[1]}</strong>)
    else if (m[3].startsWith('/')) {
      const href = m[3].endsWith('/') ? m[3] : m[3] + '/'
      out.push(<Link key={key} href={href}>{m[2]}</Link>)
    } else
      out.push(<a key={key} href={m[3]} target="_blank" rel="noopener noreferrer">{m[2]}</a>)
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export default function Markdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/)
  return (
    <div className="prose-zoult">
      {blocks.map((raw, bi) => {
        const block = raw.trim()
        const key = `b${bi}`
        if (block.startsWith('### ')) {
          const t = block.slice(4).trim()
          return <h3 key={key} id={slugifyHeading(t)}>{inline(t, key)}</h3>
        }
        if (block.startsWith('## ')) {
          const t = block.slice(3).trim()
          return <h2 key={key} id={slugifyHeading(t)}>{inline(t, key)}</h2>
        }
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
        if (lines.every((l) => /^- /.test(l)))
          return <ul key={key}>{lines.map((l, i) => <li key={i}>{inline(l.slice(2), `${key}-${i}`)}</li>)}</ul>
        if (lines.every((l) => /^\d+\. /.test(l)))
          return <ol key={key}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\d+\. /, ''), `${key}-${i}`)}</li>)}</ol>
        // Mixed block (e.g. a heading line followed by text without a blank line)
        return (
          <Fragment key={key}>
            {lines[0].startsWith('#') ? null : <p>{inline(lines.join(' '), key)}</p>}
            {lines[0].startsWith('#') && (
              <>
                <h3 id={slugifyHeading(lines[0].replace(/^#+\s*/, ''))}>{inline(lines[0].replace(/^#+\s*/, ''), key)}</h3>
                {lines.length > 1 && <p>{inline(lines.slice(1).join(' '), key + 'p')}</p>}
              </>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
