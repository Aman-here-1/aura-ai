"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {

  sql: string;

}

export default function CodeBlock({
  sql,
}: Props) {

  return (

    <SyntaxHighlighter
      language="sql"
      style={oneDark}
      customStyle={{
        borderRadius: 16,
        fontSize: 14,
      }}
    >
      {sql}
    </SyntaxHighlighter>

  );

}