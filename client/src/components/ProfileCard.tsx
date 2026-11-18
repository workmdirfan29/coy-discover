import { motion } from "framer-motion";
import { MapPin, Heart, X } from "lucide-react";
import type { PanInfo } from "framer-motion";
import type { Profile, SwipeAction } from "../types";

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (action: SwipeAction) => void;
  disabled: boolean;
}

function ProfileCard({ profile, onSwipe, disabled }: ProfileCardProps) {
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (disabled) return;

    if (info.offset.x > 110) {
      onSwipe("like");
    } else if (info.offset.x < -110) {
      onSwipe("pass");
    }
  };

  return (
    <motion.div
      className="profile-card"
      drag={disabled ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.03, rotate: 3 }}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, x: 150 }}
      transition={{ duration: 0.25 }}
    >
      <div className="profile-image-wrapper">
        <img
          src={profile.photo}
          alt={profile.name}
          className="profile-image"
          draggable={false}
        />

        <div className="profile-image-overlay" />

        <div className="profile-basic-info">
          <h2>
            {profile.name}, {profile.age}
          </h2>

          <p>
            <MapPin size={16} />
            {profile.city}
          </p>
        </div>
      </div>

      <div className="profile-details">
        <p className="profile-bio">{profile.bio}</p>

        <div className="interest-list">
          {profile.interests.map((interest) => (
            <span className="interest-tag" key={interest}>
              {interest}
            </span>
          ))}
        </div>

        <div className="card-hint">
          <span>
            <X size={15} /> Pass
          </span>
          <span>
            Like <Heart size={15} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCard;
