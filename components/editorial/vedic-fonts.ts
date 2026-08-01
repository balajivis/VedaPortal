/* =========================================================================
   Vedic type stack — the Indic half of the editorial system.

   Newsreader (the editorial serif) has NO Indic coverage. This adds the
   script faces and composes them with the Latin ones into a single
   className, so a subtree gets all of it at once:

     <div className={vedicFontsClass}> … </div>

   Scoping note, inherited from editorial-fonts.ts and load-bearing: the
   next/font variables only exist on the element carrying the className.
   The --vd-* consumers live on .vd-root, which must be the SAME element
   (or a descendant). Do not hoist them to :root — they resolve empty and
   the dark globals.css font wins.

   ⚠ ACCENT RENDERING IS THE WHOLE POINT AND IT IS NOT GUARANTEED.
   Vedic svara needs more than U+0951/U+0952. It needs the Vedic Extensions
   block, U+1CD0–U+1CFF. Most Devanagari webfonts — including Noto Serif
   Devanagari — cover the first and are patchy on the second. Before
   trusting any face here, render the test string in TEST_VEDIC_ACCENTS
   below and look at it. See components/editorial/VEDIC-TYPE.md.
   ========================================================================= */

import {
  Noto_Serif_Devanagari,
  Noto_Serif_Tamil,
  Noto_Serif_Malayalam,
  Noto_Serif_Kannada,
  Noto_Sans_Grantha,
} from 'next/font/google'
import { editorialFontsClass } from './editorial-fonts'

const devanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--vedic-devanagari',
  display: 'swap',
})

const tamil = Noto_Serif_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--vedic-tamil',
  display: 'swap',
})

const malayalam = Noto_Serif_Malayalam({
  subsets: ['malayalam', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--vedic-malayalam',
  display: 'swap',
})

const kannada = Noto_Serif_Kannada({
  subsets: ['kannada', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--vedic-kannada',
  display: 'swap',
})

/** Grantha — the script the Taittiriya tradition was historically written in
 *  across the Tamil country. Sans-only in Noto; there is no serif cut. */
const grantha = Noto_Sans_Grantha({
  subsets: ['grantha'],
  weight: ['400'],
  variable: '--vedic-grantha',
  display: 'swap',
})

/** Latin editorial faces + all Indic faces. Apply to the .vd-root element. */
export const vedicFontsClass = [
  editorialFontsClass,
  devanagari.variable,
  tamil.variable,
  malayalam.variable,
  kannada.variable,
  grantha.variable,
].join(' ')

/** The scripts a mantra can be displayed in. `iast` needs no Indic face. */
export const SCRIPTS = ['devanagari', 'iast', 'tamil', 'malayalam', 'kannada', 'grantha'] as const
export type Script = (typeof SCRIPTS)[number]

export const SCRIPT_LABELS: Record<Script, string> = {
  devanagari: 'देवनागरी',
  iast: 'IAST',
  tamil: 'தமிழ்',
  malayalam: 'മലയാളം',
  kannada: 'ಕನ್ನಡ',
  grantha: 'Grantha',
}

/* -------------------------------------------------------------------------
   FONT ACCEPTANCE TEST — do not delete.

   Real accented text, taken from the one accented Rgvedic Aranyaka prose
   that exists in digital form: the Aitareya Upanisad (AiA II.4-6), from
   sanskritdocuments, encoded by Premraj Ware. Measured: 329 marks in
   U+0951/U+0952 and 33 in Vedic Extensions U+1CD0-U+1CFF.

   The second line carries U+1CDA VEDIC TONE DOUBLE SVARITA on एवा᳚ग्र —
   which is precisely the codepoint most faces drop. If the mark is
   missing, doubled, tofu-boxed, or collides with the headline above the
   akshara, the face has FAILED and must not be shipped for the reading
   layer.

   Render it at 22px and at 34px. Accent marks are a small-size problem.
   ------------------------------------------------------------------------- */
export const TEST_VEDIC_ACCENTS = {
  /** U+0951 udatta + U+0952 anudatta, ordinary density. */
  basic: 'अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म्',
  /** U+1CDA VEDIC TONE DOUBLE SVARITA — the codepoint that separates
   *  a Vedic-capable face from a merely Devanagari one. */
  vedicExtensions: 'आ॒त्मा वा इ॒दमेक ए॒वा᳚ग्र आसीत्',
  /** Anudatta below + udatta above on adjacent aksharas — tests whether
   *  the face collides marks with the headline or the descender. */
  stacking: 'मरीचीर्मरमा᳚पः',
} as const
