import type {
  FeedResponse,
  MatchesResponse,
  SwipeAction,
  SwipeResponse,
} from "../types/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}

export function getFeed(): Promise<FeedResponse> {
  return request<FeedResponse>("/feed");
}

export function getMatches(): Promise<MatchesResponse> {
  return request<MatchesResponse>("/matches");
}

export function submitSwipe(
  profileId: number,
  action: SwipeAction,
): Promise<SwipeResponse> {
  return request<SwipeResponse>("/swipe", {
    method: "POST",
    body: JSON.stringify({
      profileId,
      action,
    }),
  });
}
