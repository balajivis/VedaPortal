'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { editorialFontsClass } from './editorial-fonts'
import './editorial.css'

export type EditorialStep = {
  /** Stable id; if omitted, index+1 is used. */
  id?: string | number
  /** Roman numeral shown in the outline (I, II, III…). */
  roman: string
  /** Short italic title shown in the outline + footer. */
  label: string
  /** One-line body shown beneath the label in the outline. */
  hint?: string
  /** Eyebrow shown above the step's H2 (e.g. "the conceptual map"). */
  eyebrow?: string
  /** Step body — render whatever you want, typically using the helpers in `blocks.tsx`. */
  body: ReactNode
}

export type EditorialPageProps = {
  /** Top-left brand crest. Defaults to "Modern AI Pro". */
  crest?: ReactNode
  /** Top-center crumb (pillar / lesson position). */
  crumb?: ReactNode
  /** Top-right meta items (duration, search, exit). */
  meta?: ReactNode
  /** Big serif hero title. Use <em> for accent words. */
  title: ReactNode
  /** Optional italic lede shown beneath the hero title (above the fold). */
  lede?: ReactNode
  /** The lesson body, broken into 6–10 steps. */
  steps: EditorialStep[]
  /** 1-indexed initial step. */
  initialStep?: number
  /** Outline label, defaults to "Lesson outline". */
  outlineLabel?: string
  /** Previous lesson — always shown in the run-foot, regardless of section. */
  prevLesson?: { title: string; href: string } | null
  /** Next lesson — always shown in the run-foot, regardless of section. */
  nextLesson?: { title: string; href: string } | null
  /** 1-indexed position of this lesson in the course (for run-foot progress). */
  lessonNumber?: number
  /** Total lessons in the course. */
  totalLessons?: number
}

function ProgressRing({ step, total }: { step: number; total: number }) {
  const r = 13
  const c = 2 * Math.PI * r
  const pct = step / total
  const offset = c * (1 - pct)
  const pctLabel = Math.round(pct * 100)
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
      <circle cx="16" cy="16" r={r} fill="none" stroke="var(--ed-line)" strokeWidth="1.2" />
      <circle
        cx="16" cy="16" r={r} fill="none"
        stroke="var(--ed-accent)" strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 16 16)"
        style={{ transition: 'stroke-dashoffset .35s cubic-bezier(.2,.7,.2,1)' }}
      />
      <text x="16" y="16" textAnchor="middle" dominantBaseline="central" fontFamily="JetBrains Mono" fontSize="9" fontWeight={500} fill="var(--ed-ink)">
        {pctLabel}
      </text>
    </svg>
  )
}

export function EditorialPage({
  crest = 'Modern AI Pro',
  crumb,
  meta,
  title,
  lede,
  steps,
  initialStep = 1,
  outlineLabel = 'Lesson outline',
  prevLesson,
  nextLesson,
  lessonNumber,
  totalLessons,
}: EditorialPageProps) {
  const [step, setStep] = useState(initialStep)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight') setStep(s => Math.min(steps.length, s + 1))
      if (e.key === 'ArrowLeft')  setStep(s => Math.max(1, s - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [steps.length])

  const current = steps[step - 1]
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className={`${editorialFontsClass} ed-root`}>

      <div className="ed-runhead">
        <Link href="/dashboard" className="ed-crest ed-crest-link" aria-label="Modern AI Pro · dashboard">{crest}</Link>
        <span className="ed-crumb">{crumb}</span>
        <div className="ed-meta-row">{meta}</div>
      </div>

      <header className="ed-hero">
        <div>
          <h1 className="ed-hero-title">{title}</h1>
          {lede ? <p className="ed-hero-lede" style={{ marginTop: 16 }}>{lede}</p> : null}
        </div>
        <div className="ed-step-row">
          <ProgressRing step={step} total={steps.length} />
          <span className="ed-step-label">
            <span className="lbl">Step</span>
            <span className="num-wrap">
              <em className="num">{pad(step)}</em>
              <span className="of">of {pad(steps.length)}</span>
            </span>
          </span>
        </div>
      </header>

      <div className="ed-layout">
        <aside className="ed-outline">
          <div className="ed-outline-lbl">
            <span>{outlineLabel}</span>
            <em>{step}/{steps.length}</em>
          </div>
          <ol>
            {steps.map((s, i) => {
              const idx = i + 1
              return (
                <li key={s.id ?? idx}>
                  <button
                    className={`ed-outline-item ${idx === step ? 'is-active' : ''}`}
                    onClick={() => setStep(idx)}
                  >
                    <span className="roman">{s.roman}</span>
                    <span>
                      <span className="name">{s.label}</span>
                      {s.hint ? <span className="hint">{s.hint}</span> : null}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </aside>

        <main className="ed-content">
          {(current?.eyebrow || current) && (
            <div className="ed-step-eyebrow">
              <span className="num">Section {pad(step)} of {pad(steps.length)}</span>
              {current?.eyebrow ? (<><span>·</span><span>{current.eyebrow}</span></>) : null}
            </div>
          )}
          {current?.body}
        </main>
      </div>

      <div className="ed-runfoot">
        {prevLesson ? (
          <Link className="ed-nav-btn" href={prevLesson.href}>
            <span className="arrow">← Previous lesson</span>
            <span className="name">{prevLesson.title}</span>
          </Link>
        ) : (
          <button className="ed-nav-btn" disabled>
            <span className="arrow">← Previous lesson</span>
            <span className="name">Start of course</span>
          </button>
        )}
        <div className="ed-runfoot-center">
          {lessonNumber && totalLessons ? (
            <>
              <span>Lesson {lessonNumber} / {totalLessons}</span>
              <div className="ed-progress-track" style={{ ['--pct' as string]: `${(lessonNumber / totalLessons) * 100}%` } as React.CSSProperties}>
                <div className="fill" />
              </div>
              <span>{Math.round((lessonNumber / totalLessons) * 100)}% of course</span>
            </>
          ) : null}
        </div>
        {nextLesson ? (
          <Link className="ed-nav-btn is-right" href={nextLesson.href}>
            <span className="arrow">Next lesson →</span>
            <span className="name">{nextLesson.title}</span>
          </Link>
        ) : (
          <button className="ed-nav-btn is-right" disabled>
            <span className="arrow">Next lesson →</span>
            <span className="name">End of course</span>
          </button>
        )}
      </div>
    </div>
  )
}
