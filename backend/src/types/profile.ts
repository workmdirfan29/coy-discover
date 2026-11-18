export interface Profile {
  id: number;
  name: string;
  age: number;
  photo: string;
  bio: string;
  city: string;
  interests: string[];
}

export interface ProfileSeed extends Profile {
  likedUser: boolean;
}

export type SwipeAction = "like" | "pass";
