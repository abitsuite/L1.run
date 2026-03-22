// src/app/whitepaper/page.jsx

import Link from 'next/link'

export const metadata = {
  title: 'Whitepaper — NodΞRunr',
  description:
    'NodΞRunr Whitepaper v0.1 — Lightweight FOSS smart daemon providing 24x7 Layer-1 concierge for Avalanche L1 node operators.',
}

const pdfUrl = '/whitepaper.pdf'
const siteOrigin = 'https://l1.run'
const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(new URL(pdfUrl, siteOrigin).href)}`

export default function WhitepaperPage() {
  return (
    <div className="relative flex flex-auto flex-col bg-gray-950">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="py-4 md:py-8 px-4 sm:px-6 lg:px-8">

          {/* ── Header: title + download button ────────────────────── */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="sm:hidden text-2xl font-bold tracking-tight text-white">
              Whitepaper v0.1
            </h1>
            <h1 className="hidden sm:flex flex-col text-5xl font-bold tracking-tight text-white">
              NodΞRunr
              <span className="flex text-3xl text-gray-400">
                Whitepaper v0.1
              </span>
            </h1>

            <a
              href={pdfUrl}
              download="NodeRunr_Whitepaper-v0.1.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 text-white font-semibold text-sm sm:text-2xl py-2.5 px-5 hover:bg-sky-400 transition duration-200 whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>

          {/* ── PDF.js viewer iframe ───────────────────────────────── */}
          <div
            className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-700"
            style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
          >
            <iframe
              src={viewerUrl}
              title="NodΞRunr Whitepaper"
              className="w-full h-full border-0"
              loading="lazy"
              allow="fullscreen"
            />
          </div>

          {/* ── Fallback link ─────────────────────────────────────── */}
          <p className="text-sm text-gray-400 mt-3 text-center">
            Having trouble viewing?{' '}
            <a href={pdfUrl} className="underline hover:text-gray-300">
              Open the PDF directly
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}
