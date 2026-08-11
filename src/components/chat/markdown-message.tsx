"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useStream } from "../../hooks/use-stream";

interface Props {
  content: string;
}

export default function MarkdownMessage({ content }: Props) {
  const streamed = useStream(content);

  return (
    <div className="prose prose-sm max-w-none prose-headings:mb-3 prose-headings:mt-5 prose-headings:font-semibold prose-headings:text-inherit prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:my-3 prose-p:leading-7 prose-p:text-inherit prose-strong:font-semibold prose-strong:text-inherit prose-a:text-cyan-300 prose-a:underline-offset-4 hover:prose-a:text-cyan-200 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-li:text-inherit prose-li:marker:text-cyan-400 prose-blockquote:my-4 prose-blockquote:border-cyan-400/70 prose-blockquote:pl-4 prose-blockquote:font-normal prose-blockquote:text-inherit prose-code:rounded prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-200 prose-code:before:content-none prose-code:after:content-none prose-pre:my-4 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700 prose-pre:bg-[#080D18] prose-pre:p-4 prose-pre:text-slate-200 prose-table:my-4 prose-table:overflow-hidden prose-th:border-slate-700 prose-th:bg-slate-800 prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:text-slate-200 prose-td:border-slate-800 prose-td:px-3 prose-td:py-2 prose-td:text-inherit">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{streamed}</ReactMarkdown>
    </div>
  );
}