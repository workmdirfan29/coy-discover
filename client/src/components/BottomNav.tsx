import { Compass, Heart, Home } from "lucide-react";
import type { ActiveTab } from "../App";

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  matchCount: number;
}

function BottomNav({ activeTab, onTabChange, matchCount }: BottomNavProps) {
  // Render compact navigation for mobile screens.
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "discover", label: "Discover", icon: Compass },
    { id: "matches", label: "Matches", icon: Heart },
  ] as const;

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            className={`mobile-nav-link ${isActive ? "active" : ""}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="mobile-nav-icon">
              <Icon size={21} strokeWidth={1.9} />

              {item.id === "matches" && matchCount > 0 && (
                <span className="mobile-nav-count">{matchCount}</span>
              )}
            </span>

            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
