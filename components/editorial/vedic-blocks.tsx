'use client'

/* =========================================================================
   Vedic reading blocks — the Depth-2 atoms.

   Design rules these encode, taken from PROJECT-VISION and Corpus Schema.
   They are enforced in the component signatures, not left to the caller:

     1. A translation can never render standalone. <Apparatus> requires the
        <Mantra> above it; a reading row without its source is not a thing
        this component set can express.
     2. Disagreement is a visible ROW, never an average.
     3. Machine output is marked IN the text, not in a footer.
     4. Every reading carries its provenance and era.
     5. `meaning` is optional. `mantraType` is required — type before you
        translate, or the model confabulates exactly where evidence is
        thinnest.
   ========================================================================= */

import { Fragment, ReactNode, useState } from 'react'
import { SCRIPTS, SCRIPT_LABELS, type Script } from './vedic-fonts'
// Order matters: editorial.css defines .ed-root (paper, ink, --ed-* tokens and
// the serif stacks); vedic.css consumes those vars. Importing only vedic.css
// leaves .ed-root unstyled and the page renders on the dark body — the exact
// failure this comment exists to prevent a second time.
import './editorial.css'
import './vedic.css'

/* ---------------------------------------------------------------- types */

export type Tier = 'settled' | 'multi_traditional' | 'contested'
export type NodeStatus = 'enumerated' | 'sourced' | 'structured' | 'voiced'
export type MantraType = 'semantic' | 'stobha' | 'bija' | 'vyahriti' | 'arthavada' | 'opaque'
export type Provenance = 'emic_intext' | 'emic_current' | 'native_posthoc' | 'modern_etic' | 'machine'

/** One token of the pada-patha. `machineSplit` is load-bearing: where no
 *  padapatha survives, the word boundary is a model's decision with no
 *  traditional checksum behind it, and the reader must be able to see that. */
export type Token = {
  text: string
  lemma?: string
  morph?: string
  machineSplit?: boolean
  /** A danda (। or ॥) — structure, not a word. Not clickable, not split. */
  danda?: boolean
  /** Break the line after this token. Set on dandas so the verse displays
   *  by hemistich rather than wrapping at the viewport edge. */
  breakAfter?: boolean
}

export type Address = {
  corpus: string          // RV, TS, SB, AVS…
  ref: string             // 3.53.12
  recension?: string      // Sakala, Andhra… — never optional in the DB
}

/* ------------------------------------------------------------- primitives */

export function Badge({
  children, tier, status, mantraType, title,
}: {
  children: ReactNode
  tier?: Tier
  status?: NodeStatus
  mantraType?: MantraType
  title?: string
}) {
  return (
    <span
      className="vd-badge"
      data-tier={tier}
      data-status={status}
      data-mantra-type={mantraType}
      title={title}
    >
      {children}
    </span>
  )
}

export function CanonicalAddress({ addr }: { addr: Address }) {
  return (
    <span className="vd-addr">
      {addr.corpus} {addr.ref}
      {addr.recension ? <span className="recension"> · {addr.recension}</span> : null}
    </span>
  )
}

export function ScriptSwitch({
  value, onChange, available,
}: {
  value: Script
  onChange: (s: Script) => void
  /** Only offer scripts this text actually exists in. Never fake a
   *  transliteration the source does not carry. */
  available: readonly Script[]
}) {
  const list = SCRIPTS.filter(s => available.includes(s))
  if (list.length < 2) return null
  return (
    <div className="vd-scripts" role="group" aria-label="Script">
      {list.map(s => (
        <button
          key={s}
          type="button"
          className="vd-script-btn"
          data-native={s !== 'iast'}
          aria-pressed={value === s}
          onClick={() => onChange(s)}
        >
          {SCRIPT_LABELS[s]}
        </button>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------- MANTRA */

export function Mantra({
  tokens, addr, script = 'devanagari', availableScripts = ['devanagari'],
  tier = 'settled', mantraType, status, activeToken, onTokenClick, onScriptChange,
}: {
  tokens: Token[]
  addr: Address
  script?: Script
  availableScripts?: readonly Script[]
  tier?: Tier
  /** REQUIRED. Not every mantra is supposed to mean something — type it
   *  before anything downstream tries to translate it. */
  mantraType: MantraType
  status?: NodeStatus
  activeToken?: number | null
  onTokenClick?: (i: number, t: Token) => void
  onScriptChange?: (s: Script) => void
}) {
  const anyMachineSplit = tokens.some(t => t.machineSplit)
  return (
    <div className="vd-mantra-wrap">
      {onScriptChange ? (
        <ScriptSwitch value={script} onChange={onScriptChange} available={availableScripts} />
      ) : null}

      <div className="vd-mantra">
        <div className="vd-mantra-text" data-script={script} lang="sa">
          {/* Fragments, not wrapper spans: .vd-linebreak only forces a row
              break when it is a DIRECT flex child of .vd-mantra-text. Nest it
              inside any element and the line wraps at the viewport instead. */}
          {tokens.map((t, i) => (
            <Fragment key={i}>
              {t.danda ? (
                <span className="vd-danda" aria-hidden="true">{t.text}</span>
              ) : (
                <button
                  type="button"
                  className="vd-token"
                  data-active={activeToken === i}
                  data-machine-split={t.machineSplit || undefined}
                  title={t.morph ? `${t.lemma ?? t.text} · ${t.morph}` : t.lemma}
                  onClick={() => onTokenClick?.(i, t)}
                >
                  {t.text}
                </button>
              )}
              {t.breakAfter ? <span className="vd-linebreak" /> : null}
            </Fragment>
          ))}
        </div>

        <CanonicalAddress addr={addr} />

        <div className="vd-mantra-badges">
          <Badge tier={tier}>
            {tier === 'multi_traditional' ? 'multiple readings' : tier}
          </Badge>
          <Badge
            mantraType={mantraType}
            title={
              mantraType === 'opaque'
                ? 'Nobody has securely construed this. Recorded as unknown rather than glossed.'
                : undefined
            }
          >
            {mantraType}
          </Badge>
          {status ? <Badge status={status}>{status}</Badge> : null}
          {anyMachineSplit ? (
            <Badge title="No padapatha survives for this sakha; word boundaries are machine-split and carry no traditional checksum.">
              machine-split
            </Badge>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- APPARATUS */

export type ApparatusRow = {
  /** padapatha · morphology · Sayana · Nirukta · Griffith · machine … */
  label: string
  /** Dated, tagged source: [TRAD-14c, ritual lens] · [MOD-1896, Victorian] */
  era?: string
  provenance?: Provenance
  /** Render Indic body text with <span className="deva"> inside. */
  body: ReactNode
  /** 0–1. Only meaningful on machine rows; shows inline, never in a preface. */
  confidence?: number
  /** Marks this reading as one side of a live disagreement. */
  contested?: boolean
  /** The plain-English anchor row — what a newcomer reads first. */
  lead?: boolean
}

export function Apparatus({ rows }: { rows: ApparatusRow[] }) {
  return (
    <div className="vd-apparatus">
      {rows.map((r, i) => (
        <div
          key={i}
          className="vd-app-row"
          data-provenance={r.provenance}
          data-contested={r.contested || undefined}
          data-lead={r.lead || undefined}
        >
          <div className="vd-app-label">
            {r.label}
            {r.era ? <span className="era">{r.era}</span> : null}
          </div>
          <div className="vd-app-body">
            {r.body}
            {typeof r.confidence === 'number' && r.confidence > 0 ? (
              <div className="vd-confidence" data-low={r.confidence < 0.55}>
                <span className="vd-confidence-track">
                  <span
                    className="vd-confidence-fill"
                    style={{ width: `${Math.round(r.confidence * 100)}%` }}
                  />
                </span>
                {Math.round(r.confidence * 100)}% agreement
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------ OCCURRENCES */

export type Occurrence = { addr: Address; gloss: ReactNode }

export function Occurrences({
  word, items, total,
}: {
  word: string
  items: Occurrence[]
  /** Full count across the corpus, which may exceed what is shown. */
  total?: number
}) {
  return (
    <aside className="vd-occ">
      <div className="vd-occ-head">
        <span className="vd-occ-word" lang="sa">{word}</span>
        <span className="vd-occ-count">
          {total ?? items.length} occurrence{(total ?? items.length) === 1 ? '' : 's'}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="vd-occ-empty">
          Not yet indexed. The concordance is built per śākhā as each text is structured.
        </p>
      ) : (
        <div className="vd-occ-list">
          {items.map((o, i) => (
            <a key={i} className="vd-occ-item" href={`/text/${o.addr.corpus}/${o.addr.ref}`}>
              <CanonicalAddress addr={o.addr} />
              <span className="vd-occ-gloss">{o.gloss}</span>
            </a>
          ))}
        </div>
      )}
    </aside>
  )
}

/* ------------------------------------------------------------- ENUMERATED */

/** The honest empty state. Use wherever a node is known to exist and
 *  nothing more is claimed. This is CONTENT on the first spiral turn, not
 *  a placeholder — say what is known and stop. */
export function Enumerated({
  claim, note, status = 'enumerated',
}: {
  claim: ReactNode
  note?: ReactNode
  status?: NodeStatus
}) {
  return (
    <div className="vd-enumerated">
      <div className="vd-enumerated-label">
        <Badge status={status}>{status}</Badge>
      </div>
      <div className="vd-enumerated-claim">{claim}</div>
      {note ? <div className="vd-enumerated-note">{note}</div> : null}
    </div>
  )
}

/* ------------------------------------------------------------------- host */

/** Wraps a reading-layer subtree in the editorial paper theme + Indic fonts,
 *  without touching the dark app shell. */
export function VedicReadingLayer({
  children, className = '',
}: { children: ReactNode; className?: string }) {
  // imported lazily by the page that owns the font className
  return <div className={`ed-root vd-root ${className}`}>{children}</div>
}

/** Convenience state hook for a Mantra + Occurrences pair. */
export function useTokenSelection() {
  const [active, setActive] = useState<number | null>(null)
  return { active, setActive }
}
