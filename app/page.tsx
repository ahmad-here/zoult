import Link from "next/link";
import Herosection from "@/components/Herosection";
import BlogCard from "@/components/BlogCard";
import { blogs } from "@/data/blogs";
import Shuffle from "@/components/Shuffle";

export default function Home() {
  return (
    <>
      <Herosection />
      <section className="max-w-6xl mx-auto px-6 mt-16" aria-labelledby="latest-heading">
        <div className="flex items-end justify-between mb-8 gap-4">
          <h2 id="latest-heading" className="text-3xl font-bold">Featured Articles</h2>
          <Link href="/blogs/" className="text-sm font-medium text-lime-800 hover:underline whitespace-nowrap">View all →</Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Shuffle limit={9} itemClassName="flex *:flex-1 *:min-w-0">{blogs.map((b) => <BlogCard key={b.slug} blog={b} />)}</Shuffle>
        </div>
      </section>
    </>
  );
}
