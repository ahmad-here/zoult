import Markdown from '../Markdown'

export default function LegalPage({ title, updated, content }: { title: string; updated: string; content: string }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500 mt-2">Last updated: {updated}</p>
      <div className="mt-6">
        <Markdown content={content} />
      </div>
    </div>
  )
}
