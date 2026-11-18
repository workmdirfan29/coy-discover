import { ArrowRight, Compass, Heart, Sparkles } from "lucide-react";

interface HomeSectionProps {
  onExplore: () => void;
}

function HomeSection({ onExplore }: HomeSectionProps) {
  return (
    <section className="home-section">
      <div className="home-content">
        <span className="section-kicker">WELCOME TO COY</span>

        <div className="home-icon">
          <Sparkles size={25} />
        </div>

        <h1>Meaningful connections begin here.</h1>

        <p>
          Discover interesting people, find shared interests and see where a
          mutual connection can take you.
        </p>

        <button className="explore-button" onClick={onExplore}>
          Explore Discover
          <ArrowRight size={18} />
        </button>

        <div className="home-highlights">
          <div>
            <Compass size={19} />
            <span>Discover people</span>
          </div>
          <div>
            <Heart size={19} />
            <span>Find mutual matches</span>
          </div>
        </div>
      </div>

      <div className="home-decoration" aria-hidden="true">
        <div className="decoration-circle circle-one">
          <Heart size={35} />
        </div>
        <div className="decoration-circle circle-two">
          <Sparkles size={27} />
        </div>
        <div className="decoration-orbit">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
