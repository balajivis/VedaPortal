import { ReactNode } from 'react'

/* ============================================================
   Editorial content blocks.
   These are the highly-visual atoms used inside step bodies.
   Use them instead of raw <p>/<h2> so the editorial design
   stays consistent across lessons.
   ============================================================ */

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="ed-h2">{children}</h2>
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="ed-h3">{children}</h3>
}

/** Italic intro paragraph beneath an H2. */
export function Lede({ children }: { children: ReactNode }) {
  return <p className="ed-lede">{children}</p>
}

/** Standard reading prose. Use <em> and <strong> for emphasis. */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="ed-prose">{children}</div>
}

export function Pullquote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <blockquote className="ed-pullquote">
      {children}
      {cite ? <span className="ed-pullquote-cite">{cite}</span> : null}
    </blockquote>
  )
}

export type StatItem = { value: ReactNode; label: ReactNode; note?: ReactNode }

/** A row of 1–4 large-display stats separated by hairlines. */
export function StatRow({ items }: { items: StatItem[] }) {
  return (
    <div className="ed-stat-row">
      {items.map((s, i) => (
        <div key={i} className="ed-stat">
          <div className="num">{s.value}</div>
          <div className="label">{s.label}</div>
          {s.note ? <div className="note">{s.note}</div> : null}
        </div>
      ))}
    </div>
  )
}

export function Callout({
  label,
  children,
  tone = 'accent',
}: {
  label?: ReactNode
  children: ReactNode
  tone?: 'accent' | 'good' | 'warn'
}) {
  const cls = tone === 'good' ? 'ed-callout is-good' : tone === 'warn' ? 'ed-callout is-warn' : 'ed-callout'
  return (
    <aside className={cls}>
      {label ? <div className="ed-callout-label">{label}</div> : null}
      {children}
    </aside>
  )
}

/** Two columns side-by-side. Use for before/after, A vs B, traditional vs new. */
export function Comparison({
  left,
  right,
}: {
  left:  { eyebrow?: ReactNode; title: ReactNode; body: ReactNode }
  right: { eyebrow?: ReactNode; title: ReactNode; body: ReactNode }
}) {
  return (
    <div className="ed-compare">
      <div>
        {left.eyebrow ? <div className="ed-compare-head">{left.eyebrow}</div> : null}
        <h4>{left.title}</h4>
        {typeof left.body === 'string' ? <p>{left.body}</p> : left.body}
      </div>
      <div>
        {right.eyebrow ? <div className="ed-compare-head">{right.eyebrow}</div> : null}
        <h4>{right.title}</h4>
        {typeof right.body === 'string' ? <p>{right.body}</p> : right.body}
      </div>
    </div>
  )
}

export type NumItem = { title: ReactNode; body: ReactNode }

/** Editorial numbered list — auto-numbered with serif italics. */
export function NumList({ items }: { items: NumItem[] }) {
  return (
    <ol className="ed-numlist">
      {items.map((it, i) => (
        <li key={i}>
          <div>
            <h4>{it.title}</h4>
            <p>{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Wraps any visual (SVG, custom canvas, image) in the editorial frame with caption.
 *  `bleed` lets the diagram escape the 1100px content column and extend to the
 *  right edge of the layout cell — use for multi-column theatres that squish
 *  inside the standard reading width. */
export function DiagramFrame({ caption, children, bleed = false }: { caption?: ReactNode; children: ReactNode; bleed?: boolean }) {
  return (
    <figure className={bleed ? 'ed-diagram ed-diagram--bleed' : 'ed-diagram'}>
      {children}
      {caption ? <figcaption className="ed-diagram-cap">{caption}</figcaption> : null}
    </figure>
  )
}

/** Term + definition. Use for glossary moments inside a step. */
export function Definition({ term, children }: { term: ReactNode; children: ReactNode }) {
  return (
    <div className="ed-defn">
      <div className="ed-defn-term">{term}</div>
      <div className="ed-defn-body">{children}</div>
    </div>
  )
}
