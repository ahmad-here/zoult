'use client'

import { Children, useEffect, useState, type ReactNode } from 'react'

function shuffledPositions(n: number) {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Visually shuffles its children on each visit.
 *
 * The React tree is never reordered (that confuses React DevTools and forces remounts).
 * Instead each child keeps its place and gets a CSS `order`, so the PARENT must be a
 * flex or grid container. Server HTML keeps the original order for crawlers.
 *
 * - limit: show only the first N items after shuffling
 * - hidden: per-child flags (same order as children) to hide items, e.g. for filters
 * - itemClassName: classes for each wrapper (it is the flex/grid item)
 */
export default function Shuffle({
  children,
  limit,
  hidden,
  itemClassName = '',
}: {
  children: ReactNode
  limit?: number
  hidden?: boolean[]
  itemClassName?: string
}) {
  const items = Children.toArray(children)
  const [positions, setPositions] = useState<number[] | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must run client-side only to avoid hydration mismatch
    setPositions(shuffledPositions(items.length))
  }, [items.length])

  // Rank visible items by their position so `limit` counts only what can be shown.
  const pos = (i: number) => (positions ? positions[i] : i)
  const visible = items.map((_, i) => i).filter((i) => !hidden?.[i]).sort((a, b) => pos(a) - pos(b))
  const shown = new Set(limit ? visible.slice(0, limit) : visible)

  return (
    <>
      {items.map((child, i) => (
        <div key={i} style={{ order: pos(i) }} className={shown.has(i) ? itemClassName : 'hidden'}>
          {child}
        </div>
      ))}
    </>
  )
}
