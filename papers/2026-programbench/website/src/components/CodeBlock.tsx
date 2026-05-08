interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "text", title }: CodeBlockProps) {
  return (
    <figure className="code-block">
      {title ? <figcaption>{title}</figcaption> : null}
      <pre>
        <code data-language={language}>{code.trim()}</code>
      </pre>
    </figure>
  );
}
