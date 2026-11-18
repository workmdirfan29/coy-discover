import { useCallback, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import HomeSection from "./components/HomeSection";
import DiscoverSection from "./components/DiscoverSection";
import MatchesSection from "./components/MatchesSection";
import MatchModal from "./components/MatchModal";

import { getFeed, getMatches, submitSwipe } from "./services/api";
import type { Profile, SwipeAction } from "./types/types";

import "./App.css";

export type ActiveTab = "home" | "discover" | "matches";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab: ActiveTab =
    location.pathname === "/matches"
      ? "matches"
      : location.pathname === "/"
        ? "home"
        : "discover";

  const [feed, setFeed] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [error, setError] = useState("");

  const handleTabChange = (tab: ActiveTab) => {
    const paths: Record<ActiveTab, string> = {
      home: "/",
      discover: "/discover",
      matches: "/matches",
    };

    navigate(paths[tab]);
  };

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [feedResponse, matchResponse] = await Promise.all([
        getFeed(),
        getMatches(),
      ]);

      setFeed(feedResponse.profiles || []);
      setMatches(matchResponse.matches || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load application data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInitialData();
  }, [loadInitialData]);

  const handleSwipe = async (action: SwipeAction) => {
    const currentProfile = feed[0];

    if (!currentProfile || swiping) return;

    setSwiping(true);
    setError("");

    try {
      const response = await submitSwipe(currentProfile.id, action);

      if (!response.success) {
        throw new Error("Your action could not be saved.");
      }

      setFeed((currentFeed) =>
        currentFeed.filter((profile) => profile.id !== currentProfile.id),
      );

      if (response.matched && response.match) {
        setMatchedProfile(response.match);

        const matchResponse = await getMatches();
        setMatches(matchResponse.matches || []);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to submit your action.",
      );
    } finally {
      setSwiping(false);
    }
  };

  return (
    <div className="app-shell">
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        matchCount={matches.length}
      />

      <main className="main-content">
        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button onClick={() => setError("")} aria-label="Dismiss error">
              ×
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={<HomeSection onExplore={() => navigate("/discover")} />}
          />

          <Route
            path="/discover"
            element={
              <DiscoverSection
                feed={feed}
                loading={loading}
                swiping={swiping}
                onSwipe={handleSwipe}
              />
            }
          />

          <Route
            path="/matches"
            element={<MatchesSection matches={matches} loading={loading} />}
          />

          <Route path="*" element={<Navigate to="/discover" replace />} />
        </Routes>
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        matchCount={matches.length}
      />

      <MatchModal
        profile={matchedProfile}
        onClose={() => setMatchedProfile(null)}
      />
    </div>
  );
}

export default App;
