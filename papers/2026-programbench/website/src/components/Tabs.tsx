import type { NavItem, TabId } from "../types";

interface TabsProps {
  items: NavItem[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function Tabs({ items, activeTab, onTabChange }: TabsProps) {
  return (
    <nav className="tabs" aria-label="Paper sections">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeTab;

        return (
          <button
            key={item.id}
            type="button"
            className={isActive ? "tab-button active" : "tab-button"}
            onClick={() => onTabChange(item.id)}
            aria-current={isActive ? "page" : undefined}
            title={item.label}
          >
            <Icon size={17} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
