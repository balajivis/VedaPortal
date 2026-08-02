import Link from 'next/link'
import { vedicFontsClass } from './vedic-fonts'
import './editorial.css'
import './vedic.css'

/* Shared page frame. Order matters: editorial.css defines .ed-root (paper,
   ink, the --ed-* tokens); vedic.css consumes them. Importing only vedic.css
   leaves .ed-root unstyled and the page renders on the dark body. */
export function Shell({ crumb, children }: { crumb: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={vedicFontsClass}>
      <div className="ed-root vd-root">
        <div className="ed-runhead">
          <Link href="/" className="ed-crest ed-crest-link">Veda Portal</Link>
          <div className="ed-crumb">{crumb}</div>
          <div className="ed-meta-row">Ṛgveda · Śākala · Saṃhitā</div>
        </div>
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 56px 96px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export function Crumb({ parts }: { parts: { label: string; href?: string }[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 ? <span className="sep">·</span> : null}
          {p.href ? <Link href={p.href} className="ed-crumb-link">{p.label}</Link> : <span>{p.label}</span>}
        </span>
      ))}
    </>
  )
}
