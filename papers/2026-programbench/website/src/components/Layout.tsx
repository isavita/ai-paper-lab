import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { NavItem, TabId, Theme } from "../types";
import { Tabs } from "./Tabs";

interface LayoutProps {
  navItems: NavItem[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: ReactNode;
}

export function Layout({ navItems, activeTab, onTabChange, children }: LayoutProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = window.localStorage.getItem("programbench-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("programbench-theme", theme);
  }, [theme]);

  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Paper navigation">
        <div className="brand-block">
          <span className="brand-kicker">AI Paper Lab</span>
          <h1>ProgramBench</h1>
          <p>Can language models rebuild programs from scratch?</p>
        </div>
        <Tabs items={navItems} activeTab={activeTab} onTabChange={onTabChange} />
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(nextTheme)}
          aria-label={`Switch to ${nextTheme} mode`}
          title={`Switch to ${nextTheme} mode`}
        >
          <ThemeIcon size={18} />
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </aside>
      <main className="content-shell">{children}</main>
    </div>
  );
}
