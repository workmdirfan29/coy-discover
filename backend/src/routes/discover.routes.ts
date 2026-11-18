import { Router, Request, Response } from "express";
import db from "../config/database.js";
import type { Profile, SwipeAction } from "../types/profile.ts";

const router = Router();
const USER_ID = 1;

interface ProfileRow {
  id: number;
  name: string;
  age: number;
  photo: string;
  bio: string;
  city: string;
  interests: string;
}

function formatProfile(row: ProfileRow): Profile {
  return {
    ...row,
    interests: JSON.parse(row.interests) as string[],
  };
}

// GET /feed
router.get("/feed", (_req: Request, res: Response) => {
  try {
    const rows = db
      .prepare(
        `
        SELECT p.id, p.name, p.age, p.photo, p.bio, p.city, p.interests
        FROM profiles p
        WHERE NOT EXISTS (
          SELECT 1 FROM swipes s
          WHERE s.profile_id = p.id AND s.user_id = ?
        )
        ORDER BY p.id ASC
      `,
      )
      .all(USER_ID) as ProfileRow[];

    res.json({
      success: true,
      count: rows.length,
      profiles: rows.map(formatProfile),
    });
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch profiles.",
    });
  }
});

// POST /swipe
router.post("/swipe", (req: Request, res: Response) => {
  try {
    const { profileId, action } = req.body as {
      profileId?: number;
      action?: SwipeAction;
    };

    if (
      !Number.isInteger(profileId) ||
      !["like", "pass"].includes(action ?? "")
    ) {
      res.status(400).json({
        success: false,
        message: "A valid profileId and action are required.",
      });
      return;
    }

    const profile = db
      .prepare(
        `
        SELECT id, name, liked_user
        FROM profiles
        WHERE id = ?
      `,
      )
      .get(profileId) as
      | { id: number; name: string; liked_user: number }
      | undefined;

    if (!profile) {
      res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
      return;
    }

    const existingSwipe = db
      .prepare(
        `
        SELECT id FROM swipes
        WHERE user_id = ? AND profile_id = ?
      `,
      )
      .get(USER_ID, profileId);

    if (existingSwipe) {
      res.status(409).json({
        success: false,
        message: "This profile has already been swiped.",
      });
      return;
    }

    db.prepare(
      `
      INSERT INTO swipes (user_id, profile_id, action)
      VALUES (?, ?, ?)
    `,
    ).run(USER_ID, profileId, action);

    const matched = action === "like" && profile.liked_user === 1;

    res.status(201).json({
      success: true,
      action,
      matched,
      match: matched ? { id: profile.id, name: profile.name } : null,
    });
  } catch (error) {
    console.error("Failed to save swipe:", error);
    res.status(500).json({
      success: false,
      message: "Unable to save swipe.",
    });
  }
});

// GET /matches
router.get("/matches", (_req: Request, res: Response) => {
  try {
    const rows = db
      .prepare(
        `
        SELECT p.id, p.name, p.age, p.photo, p.bio, p.city, p.interests
        FROM profiles p
        INNER JOIN swipes s ON s.profile_id = p.id
        WHERE s.user_id = ?
          AND s.action = 'like'
          AND p.liked_user = 1
        ORDER BY s.id DESC
      `,
      )
      .all(USER_ID) as ProfileRow[];

    res.json({
      success: true,
      count: rows.length,
      matches: rows.map(formatProfile),
    });
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch matches.",
    });
  }
});

// POST /reset-demo
// Clear saved swipes so all seeded profiles become available again.
router.post("/reset-demo", (_req: Request, res: Response) => {
  try {
    const resetDemo = db.transaction(() => {
      db.prepare("DELETE FROM swipes WHERE user_id = ?").run(USER_ID);
    });

    resetDemo();

    const totalProfiles = db
      .prepare("SELECT COUNT(*) AS count FROM profiles")
      .get() as { count: number };

    res.json({
      success: true,
      message: "Demo data reset successfully.",
      profilesAvailable: totalProfiles.count,
    });
  } catch (error) {
    console.error("Failed to reset demo data:", error);
    res.status(500).json({
      success: false,
      message: "Unable to reset demo data.",
    });
  }
});

export default router;
