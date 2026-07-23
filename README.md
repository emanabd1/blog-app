# BlogSpace

BlogSpace is a React blog application built with Vite, React Router, Jotai, and Tailwind CSS. It combines fetched posts and comments from the DummyJSON API with local custom posts, bookmarks, likes, and search.

## Features

- Fetches blog posts and comments from the DummyJSON API
- Displays API posts and custom local posts together
- Allows creating, editing, and deleting local custom posts
- Supports bookmarking posts with persistent storage
- Lets users like posts and preserves likes across refresh
- Includes full-card navigation to the details page
- Filters posts by search text and tag selection
- Renders comments on the blog details page
- Provides a dedicated bookmarks page
- Uses Tailwind CSS for modern responsive UI

## Project Structure

- `src/App.jsx` — app shell and route definitions
- `src/pages/Home.jsx` — post feed, filters, and search
- `src/pages/BlogDetails.jsx` — single post details and comments
- `src/pages/CreatePost.jsx` — form page to add a custom post
- `src/pages/Bookmarks.jsx` — saved bookmarks view
- `src/components/BlogCard.jsx` — card display for each post
- `src/components/BlogForm.jsx` — reusable form for new posts
- `src/components/Navbar.jsx` — app navigation and search
- `src/components/Footer.jsx` — site footer
- `src/components/CommentCard.jsx` — renders each comment
- `src/components/Hero.jsx` — hero section for the Home page
- `src/components/Loading.jsx` — loading skeleton UI
- `src/components/EmptyState.jsx` — empty state messages
- `src/services/api.js` — fetch logic for posts/comments
- `src/atoms` — Jotai state atoms for persistence
- `src/utils/postImage.js` — image selection helper

## Documentation

- `PROJECT_SUMMARY.md` — project overview and app capabilities
- `CODE_EXPLANATION.md` — line-by-line code explanation for presentation

## Getting Started

### Install dependencies

```bash
npm install


Run the development server

npm run dev

Open the app at the address shown in the terminal, usually http://localhost:5173.

Build for production

npm run build

Preview the production build

npm run preview

Technologies
React 19
Vite
React Router DOM
Jotai
Tailwind CSS
Sonner
React Icons



Notes


Local custom posts, bookmarks, and likes are persisted using localStorage.

Comments are fetched from https://dummyjson.com/comments/post/:id.

The app supports both /blog/:id and /comments/blog/:id for the details page.


Author

Built by Eman Abdulsemed.
