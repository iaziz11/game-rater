# GameShelf

GameShelf is a web application for searching video games, tracking what you have played, rating titles, and organizing games into lists. It is built as a portfolio project with an emphasis on clean UI, responsive layouts, and a simple, maintainable architecture.

## Key Features

- Game search with results list, cover art, and release year
- Game detail pages with metadata (summary/storyline, platforms, release date, time-to-beat when available)
- Personal ratings (0–10 with half-step precision) saved per user
- List management: create, edit, delete custom lists
- Save games to lists directly from search results and game pages (multi-list support via checklist-style menu)
- Authentication (register, log in, log out) to keep ratings and lists tied to a user account

## Tech Stack

- React
- React Router
- React Query (data fetching + caching)
- Material UI (MUI) for UI components and styling

## Pages and Flow

- `/search` — start a search query
- `/results?q=...` — browse results and add games to lists
- `/game/:id` — view details for a specific game and manage your rating/lists
- `/login` and `/register` — authentication
- `/profile` and `/list/:id` — manage and browse lists (implementation in the project)

## Local Development

### Prerequisites

- Node.js (LTS recommended)
- npm (or yarn/pnpm)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (see next section)
4. Run the development server:
   ```bash
   npm run dev
   ```
   If your project is configured with Create React App instead of Vite, use:
   ```bash
   npm start
   ```

### Production Build

```bash
npm run build
```

## Project Structure (High Level)

```text
src/
  contexts/        # Auth context and global app state
  features/        # Feature modules (search, game details, lists)
  services/        # API + persistence functions
  ui/              # Reusable UI components (menus, modals, layout helpers)
  components/      # App-level components (layout, header, etc.)
```

## Notes

- This project is intended for portfolio/demo use.
- Game data and imagery are provided by a third-party data source. Ensure your usage complies with the provider’s terms.

## Roadmap Ideas

- Advanced search filters (platforms, genres, year)
- Better list analytics (average rating, completed vs. backlog)
- Shareable/public lists
- Improved offline caching and optimistic UI updates
