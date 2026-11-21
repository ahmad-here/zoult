'use client'
import { useState, type ReactNode } from 'react'
import Shuffle from '@/components/Shuffle'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'fun', label: 'Fun' },
  { id: 'tools', label: 'Tools' },
  { id: 'ai', label: 'AI' },
]

/** Filter buttons over pre-rendered (server) cards. Every card stays in the HTML for crawlers. */
export default function WebsiteList({ cards }: { cards: { tags: string[]; node: ReactNode; key: string }[] }) {
  const [active, setActive] = useState('all')
  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10" role="group" aria-label="Filter websites">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            aria-pressed={active === f.id}
            className={`px-5 py-2 rounded-full transition-colors ${active === f.id ? 'bg-[#A8D400] text-gray-900 font-semibold' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Shuffle itemClassName="flex *:flex-1 *:min-w-0" hidden={cards.map((c) => active !== 'all' && !c.tags.includes(active))}>
          {cards.map((c) => c.node)}
        </Shuffle>
      </div>
    </>
  )
}
