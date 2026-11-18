export interface Profile {
  id: number;
  name: string;
  age: number;
  photo: string;
  bio: string;
  city: string;
  interests: string[];
}

export type SwipeAction = "like" | "pass";

export interface FeedResponse {
  success: boolean;
  count: number;
  profiles: Profile[];
}

export interface SwipeResponse {
  success: boolean;
  action: SwipeAction;
  matched: boolean;
  match: Profile | null;
}

export interface MatchesResponse {
  success: boolean;
  count: number;
  matches: Profile[];
}
