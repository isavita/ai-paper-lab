interface EquationBlockProps {
  equation: string;
  caption: string;
}

export function EquationBlock({ equation, caption }: EquationBlockProps) {
  return (
    <figure className="equation-block">
      <div className="equation">{equation}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
