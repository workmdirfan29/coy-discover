import db from "../config/database.js";
import { mockProfiles } from "./profiles.js";

// Insert mock profiles only when they are not already present.
const insertProfile = db.prepare(`
  INSERT OR IGNORE INTO profiles (
    id,
    name,
    age,
    photo,
    bio,
    city,
    interests,
    liked_user
  )
  VALUES (
    @id,
    @name,
    @age,
    @photo,
    @bio,
    @city,
    @interests,
    @likedUser
  )
`);

// Use a transaction to keep the seed operation consistent.
export const seedProfiles = db.transaction(() => {
  for (const profile of mockProfiles) {
    insertProfile.run({
      ...profile,
      interests: JSON.stringify(profile.interests),
      likedUser: profile.likedUser ? 1 : 0,
    });
  }
});

seedProfiles();

console.log(`${mockProfiles.length} mock profiles checked successfully.`);
