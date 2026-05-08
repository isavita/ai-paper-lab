import { ExternalLink } from "lucide-react";
import type { ReferenceItem } from "../types";

interface ReferenceListProps {
  references: ReferenceItem[];
}

export function ReferenceList({ references }: ReferenceListProps) {
  return (
    <div className="reference-list">
      {references.map((reference) => (
        <article className="reference-item" key={reference.url}>
          <div>
            <span className={`reference-kind kind-${reference.kind}`}>{reference.kind}</span>
            <h3>{reference.title}</h3>
            <p>{reference.note}</p>
          </div>
          <a href={reference.url} target="_blank" rel="noreferrer" aria-label={`Open ${reference.title}`}>
            <ExternalLink size={18} />
          </a>
        </article>
      ))}
    </div>
  );
}
