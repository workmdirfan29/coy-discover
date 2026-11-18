import { Compass, Heart, Home } from "lucide-react";
import type { ActiveTab } from "../App";

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  matchCount: number;
}

function Navbar({ activeTab, onTabChange, matchCount }: NavbarProps) {
  // Keep navigation items in one place for consistent rendering.
  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "discover", label: "Discover", icon: Compass },
    { id: "matches", label: "Matches", icon: Heart },
  ] as const;

  return (
    <header className="top-navbar">
      <div className="navbar-inner">
        <button
          className="brand"
          onClick={() => onTabChange("discover")}
          aria-label="Coy home"
        >
          <span className="brand-symbol">c</span>
          <span>
            coy<span className="brand-period">.</span>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon size={17} strokeWidth={1.9} />
                <span>{item.label}</span>

                {item.id === "matches" && matchCount > 0 && (
                  <span className="nav-count">{matchCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="navbar-status">
          <span className="status-dot" />
          Discover your people
        </div>
      </div>
    </header>
  );
}

export default Navbar;
