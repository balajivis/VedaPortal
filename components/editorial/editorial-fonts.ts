/* =========================================================================
   Editorial fonts — single source of truth.

   Loaded via next/font once. Exposed as a className that, when applied to
   any element, makes the --editorial-serif / --editorial-sans /
   --editorial-mono CSS variables available on that subtree.

   Use this className anywhere editorial typography is needed:
     <section className={editorialFontsClass}> ... </section>

   The .ed-root class in editorial.css consumes these variables via
   `var(--editorial-serif, …fallback…)`, so if this className is missing
   we fall back gracefully to system serifs instead of the body's Arial.
   ========================================================================= */

import { Newsreader, Inter_Tight, JetBrains_Mono } from 'next/font/google'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--editorial-serif',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--editorial-sans',
  display: 'swap',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--editorial-mono',
  display: 'swap',
})

/** Apply this className to any element to enable editorial typography on its subtree. */
export const editorialFontsClass = `${newsreader.variable} ${interTight.variable} ${jbMono.variable}`
