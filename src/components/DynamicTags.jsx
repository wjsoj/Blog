import { useState } from "preact/hooks";
import BlogInfo from "./BlogInfo.jsx";

export default function DynamicTags({blog}) {
  const tags = [...new Set(blog.map((post) => post.data.tag).flat())];
  let [selectedTag, setSelectedTag] = useState(null);
  function matchPost(matchtag) {
    return blog.filter((post)=> post.data.tag.includes(matchtag))
  }
  // 一系列button对应一个tag
  return (
    <main className="flex flex-col justify-start items-center max-w-xl">
      <div className="flex flex-row justify-center flex-wrap space-x-4 space-y-2 mt-4">
        <button
          onClick={() => setSelectedTag(null)}
          key="none"
          className={`px-6 py-2 rounded-xl text-slate-800 dark:text-slate-200 ${!selectedTag ? " bg-red-300 dark:bg-violet-700":"bg-sky-200 dark:bg-sky-800"}`}
        >
          ALL
        </button>
        {tags.map((tag) => (
          <button
            onClick={() => setSelectedTag(tag)}
            key={tag}
            className={`px-6 py-2 rounded-xl text-slate-800 dark:text-slate-200 ${selectedTag === tag ? " bg-red-300 dark:bg-violet-700" : "bg-sky-200 dark:bg-sky-800"}`}
          >
            {tag}
          </button>
        ))}
      </div>
      <section className="flex flex-col w-full px-3 space-y-4 py-10">
        {selectedTag
        ? matchPost(selectedTag).map((post) => (
            <BlogInfo info={post.data} link={`/blog/${post.slug}/`} />
          ))
        : blog.map((post) => (
            <BlogInfo info={post.data} link={`/blog/${post.slug}/`} />
        ))}
      </section>
    </main>
  )
}