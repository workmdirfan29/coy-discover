# Coy Discover — Swipe-Based Profile Discovery

A full-stack profile discovery application inspired by modern swipe-based platforms. Users can explore profiles, like or pass on people, and connect through mutual matches.

## Overview

Coy Discover is a standalone application built as part of the Coy SDE Intern Assignment. It introduces a Discover experience where users can browse one profile at a time and create a match when both users express mutual interest.

The application uses a React frontend, Node.js and Express backend, and SQLite for persistent data storage.

## Features

### Profile Discovery

- Browse one profile at a time.
- View profile details including name, age, photo, bio, city and interests.
- Discover profiles through an interactive card interface.

### Swipe Experience

- Like or pass on profiles using action buttons.
- Support drag gestures for swipe interactions.
- Animated profile card interactions.
- Previously swiped profiles are excluded from the discovery feed.
- Display an empty state when no profiles remain.

### Mutual Matching

- A match is created only when both users like each other.
- Display an "It's a match!" experience when a mutual match occurs.
- View mutual matches in a dedicated Matches section.
- Keep non-mutual likes private.

### Backend and Data

- Seeded mock profile data (30 profiles).
- SQLite database for storing profiles and swipe actions.
- REST API endpoints for discovery, swiping and matches.
- Persistent swipe and match data across page reloads.

## Tech Stack

### Frontend

- React.js
- TypeScript
- Vite
- CSS
- Lucide React
- Framer Motion (if used in the final implementation)

### Backend

- Node.js
- Express.js
- TypeScript
- SQLite
- better-sqlite3

## Project Structure

```text
coy-discover/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── data/
│   │   │   ├── profiles.ts
│   │   │   └── seed.ts
│   │   ├── routes/
│   │   │   └── discover.routes.ts
│   │   └── types/
│   │       └── profile.ts
│   ├── server.ts
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/coy-discover.git
cd coy-discover
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Start the Backend

```bash
npm run dev
```

The backend runs on the configured local server port.

### 4. Install Frontend Dependencies

Open another terminal:

```bash
cd coy-discover/client
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

> Note: The commands above assume the respective package.json files contain a dev script. Update these commands if your scripts use different names.

## API Endpoints

| Method | Endpoint   | Description                      |
| ------ | ---------- | -------------------------------- |
| GET    | `/feed`    | Fetch profiles not yet swiped on |
| POST   | `/swipe`   | Save a Like or Pass action       |
| GET    | `/matches` | Fetch mutual matches             |

### API Behaviour

- The feed excludes profiles that the user has already swiped on.
- Swipe actions are stored in SQLite.
- A match is returned only when both users have liked each other.
- The matches endpoint returns mutual matches rather than exposing all incoming likes.

## Demo Data

The application uses at least 30 mock profiles for demonstration.

Some profiles are seeded with an existing like for the logged-in user so that mutual matches can be demonstrated during testing.

## Design Goals

- Clean and intuitive interface.
- Responsive experience across desktop and mobile screens.
- Simple navigation between application sections.
- Clear feedback for swipe and match interactions.
- Privacy-conscious mutual matching behaviour.

## Future Improvements

- User authentication and individual profiles.
- Real-time match notifications.
- Profile filters and advanced discovery preferences.
- Production deployment and scalable database infrastructure.

## Assignment Context

Developed as a standalone implementation of the Discover tab for the Coy SDE Intern Assignment.

**Repository:** https://github.com/workmdirfan29/coy-discover

---

**Author:** MD IRFAN

**Role:** Software Development Intern Applicant
