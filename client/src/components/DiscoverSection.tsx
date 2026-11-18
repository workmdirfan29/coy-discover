import { Heart, LoaderCircle, Sparkles, X } from "lucide-react";

import ProfileCard from "./ProfileCard";
import type { Profile, SwipeAction } from "../types/types.ts";

interface DiscoverSectionProps {
  feed: Profile[];
  loading: boolean;
  swiping: boolean;
  onSwipe: (action: SwipeAction) => void;
}

function DiscoverSection({
  feed,
  loading,
  swiping,
  onSwipe,
}: DiscoverSectionProps) {
  if (loading) {
    return (
      <section className="section-state">
        <LoaderCircle className="loading-icon" size={30} />
        <h2>Finding your people</h2>
        <p>Getting your discover feed ready.</p>
      </section>
    );
  }

  if (feed.length === 0) {
    return (
      <section className="section-state">
        <div className="state-icon">
          <Sparkles size={30} />
        </div>
        <span className="section-kicker">DISCOVER</span>
        <h2>You've seen everyone for now.</h2>
        <p>Check back later to discover more people.</p>
      </section>
    );
  }

  return (
    <section className="discover-layout">
      <div className="section-heading">
        <span className="section-kicker">A LITTLE CLOSER</span>
        <h1>Discover people.</h1>
        <p>Good connections start with a simple hello.</p>
      </div>

      <div className="discover-content">
        <div className="discover-side-note">
          <Sparkles size={18} />
          <p>Find people who share your interests and make a new connection.</p>
        </div>

        <div className="discover-center">
          <div className="profile-counter">
            <span className="counter-dot" />
            {feed.length} profiles to discover
          </div>

          <div className="card-container">
            <ProfileCard
              key={feed[0].id}
              profile={feed[0]}
              onSwipe={onSwipe}
              disabled={swiping}
            />
          </div>

          <div className="swipe-actions">
            <button
              className="action-button pass-button"
              onClick={() => onSwipe("pass")}
              disabled={swiping}
              aria-label="Pass profile"
            >
              <X size={25} strokeWidth={2} />
            </button>

            <button
              className="action-button like-button"
              onClick={() => onSwipe("like")}
              disabled={swiping}
              aria-label="Like profile"
            >
              <Heart size={25} strokeWidth={2} />
            </button>
          </div>

          <p className="swipe-instruction">
            <span>←</span> Pass <span className="instruction-divider">·</span>
            Like <span>→</span>
          </p>
        </div>

        <div className="discover-side-note right-note">
          <Heart size={18} />
          <p>When the interest is mutual, you'll find your match here.</p>
        </div>
      </div>
    </section>
  );
}

export default DiscoverSection;
