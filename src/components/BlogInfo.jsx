import FormattedDate from "./FormattedDate.jsx";

export default function BlogInfo({ info,link }) {
  return (
    <div className="flex grow flex-col space-y-2 rounded-xl bg-gradient-to-br from-pink-400/10 to-slate-200 dark:from-violet-700/20 dark:to-slate-900/30 border-t-2 border-l-2 shadow-md dark:shadow-slate-500 dark:shadow-inner border-slate-100 dark:border-slate-900 px-6 py-4 text-slate-800 dark:text-white">
      <div className="flex flex-row justify-between items-center flex-wrap">
        <div className="flex flex-col space-y-1 items-start">
          <a className="text-xl lg:text-2xl font-bold hover:underline" href={link}>{info.title}</a>
          <FormattedDate date={info.pubDate} className="text-sm"/>
        </div>
        <div className="badge badge-accent">{info.tag}</div>
      </div>
      <p className="text-base line-clamp-3"><span className="text-violet-700 dark:text-violet-400">简介：</span>{info.description}</p>
    </div>
  )
}