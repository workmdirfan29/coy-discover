import { Heart, LoaderCircle, Users } from "lucide-react";
import type { Profile } from "../types/types.ts";

interface MatchesSectionProps {
  matches: Profile[];
  loading: boolean;
}

function MatchesSection({ matches, loading }: MatchesSectionProps) {
  if (loading) {
    return (
      <section className="section-state">
        <LoaderCircle className="loading-icon" size={30} />
        <h2>Loading your matches</h2>
      </section>
    );
  }

  return (
    <section className="matches-section">
      <div className="section-heading">
        <span className="section-kicker">MUTUAL CONNECTIONS</span>
        <h1>Your matches.</h1>
        <p>Every good connection starts somewhere.</p>
      </div>

      {matches.length === 0 ? (
        <div className="section-state matches-empty">
          <div className="state-icon">
            <Users size={30} />
          </div>
          <h2>No matches just yet.</h2>
          <p>Keep exploring. Your next connection could be one swipe away.</p>
        </div>
      ) : (
        <>
          <div className="matches-summary">
            <div>
              <span className="summary-number">{matches.length}</span>
              <span className="summary-label">
                {matches.length === 1 ? "connection" : "connections"}
              </span>
            </div>
            <Heart size={21} />
          </div>

          <div className="matches-grid">
            {matches.map((profile) => (
              <article className="match-card" key={profile.id}>
                <div className="match-image-wrap">
                  <img src={profile.photo} alt={profile.name} />
                  <span className="match-badge">
                    <Heart size={13} fill="currentColor" />
                    Matched
                  </span>
                </div>

                <div className="match-card-info">
                  <h3>
                    {profile.name}, {profile.age}
                  </h3>
                  <p>{profile.city}</p>

                  <div className="match-interests">
                    {profile.interests.slice(0, 2).map((interest) => (
                      <span key={interest}>{interest}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default MatchesSection;
