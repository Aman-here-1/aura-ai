"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useStream } from "../../hooks/use-stream";

interface Props {

  content: string;

}

export default function MarkdownMessage({
  content,
}: Props) {

  const streamed =
    useStream(content);

  return (

    <div className="prose prose-slate max-w-none">

      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
        ]}
      >

        {streamed}

      </ReactMarkdown>

    </div>

  );

}