import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import type { Profile } from "../types";

interface MatchModalProps {
  profile: Profile | null;
  onClose: () => void;
}

function MatchModal({ profile, onClose }: MatchModalProps) {
  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="match-modal"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close match popup"
            >
              <X size={20} />
            </button>

            <div className="match-icon">
              <Heart size={34} fill="currentColor" />
            </div>

            <h2>It's a Match!</h2>
            <p>You and {profile.name} liked each other.</p>

            <img
              src={profile.photo}
              alt={profile.name}
              className="match-photo"
            />

            <h3>
              {profile.name}, {profile.age}
            </h3>

            <button className="match-button" onClick={onClose}>
              Continue Discovering
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MatchModal;
