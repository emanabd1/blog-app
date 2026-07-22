# Blog App Project Summary

## Overview
BlogSpace is a React blog application built with Vite, React Router, Jotai, and Tailwind CSS.
It combines fetched content from the DummyJSON API with locally created posts, and provides search, tag filtering, comments, likes, bookmarks, and custom post editing.

## Purpose
The app is designed to demonstrate a complete frontend blog experience with:
- API integration for posts and comments
- persistent client-side state
- dynamic routing and full-card navigation
- editable local posts and bookmarks
- responsive, Tailwind-styled UI

## Project Structure

- `src/App.jsx`
  - Main application shell.
  - Defines routes for Home, Blog Details, Create Post, Bookmarks, and NotFound.
  - Supports both `/blog/:id` and `/comments/blog/:id` for the same details view.
  - Renders `Navbar`, `Footer`, and `Toaster` globally.

- `src/components/Navbar.jsx`
  - Site header with links to Home, Create Post, and Bookmarks.
  - Includes search input connected to `searchAtom`.
  - Displays current bookmark count.

- `src/components/BlogCard.jsx`
  - Card UI for a single post.
  - Supports click-to-navigate for the full card.
  - Shows a title, excerpt, tags, image, like button, bookmark button, and comment count.
  - Supports edit/delete actions for locally created posts.
  - Selects a content-specific local image when API images are unavailable.

- `src/components/BlogForm.jsx`
  - Reusable form for creating a custom post.
  - Collects title, body, image preview, and optional tags.
  - Validates required fields and emits a new post object.

- `src/components/CommentCard.jsx`
  - Displays a comment with user avatar, name, handle, and body.
  - Handles missing user data safely.

- `src/components/Hero.jsx`
  - Landing section shown on the Home page.
  - Provides app intro text and calls to action.

- `src/components/Loading.jsx`
  - Displays skeleton cards and loading indicators.
  - Used while fetching posts or details.

- `src/components/EmptyState.jsx`
  - Shown when bookmarks or filtered results are empty.
  - Provides a friendly message and guidance.

- `src/pages/Home.jsx`
  - Fetches fetched posts from DummyJSON on mount.
  - Combines API posts with local posts from `customPostsAtom`.
  - Fetches comment counts for API posts.
  - Builds tag filters from all available post tags.
  - Filters results by search query and selected tag.
  - Renders `BlogCard` components in a responsive grid.

- `src/pages/BlogDetails.jsx`
  - Reads `id` from route params using `useParams()`.
  - Loads a local custom post if one exists for the ID.
  - Otherwise, fetches the single post and comment list from the API.
  - Supports bookmarking, liking, and deleting.
  - Allows local posts to be edited via `?edit=1`.
  - Displays comments with `CommentCard`.

- `src/pages/CreatePost.jsx`
  - Renders a page with `BlogForm`.
  - Adds newly created posts to `customPostsAtom`.
  - Navigates back to Home on success.

- `src/pages/Bookmarks.jsx`
  - Shows bookmarked posts from `bookmarksAtom`.
  - Lets the user remove bookmarks.
  - Shows an empty state when no bookmarks are saved.

- `src/pages/NotFound.jsx`
  - Fallback page for undefined routes.
  - Shows a friendly 404 message.

- `src/services/api.js`
  - Contains helper functions for fetching external data.
  - `getPosts()` fetches `https://dummyjson.com/posts?limit=10`.
  - `getPost(id)` fetches a single post by ID.
  - `getComments(id)` fetches comments for a post.

- `src/atoms/postAtom.jsx`
  - Persistent Jotai atom for custom local posts.
  - Uses `localStorage` key `blog-app-custom-posts`.

- `src/atoms/bookmarkAtom.jsx`
  - Persistent Jotai atom for bookmarked posts.
  - Uses `localStorage` key `blog-app-bookmarks`.

- `src/atoms/likesAtom.jsx`
  - Persistent Jotai atom for liked post IDs.
  - Uses `localStorage` key `blog-app-liked-posts`.

- `src/atoms/searchAtom.jsx`
  - Jotai atom for the global search query.

- `src/utils/postImage.js`
  - Chooses a local image asset based on post content.
  - Matches keywords in title, tags, and body.
  - Falls back to a seeded image selection for consistent results.

## Core Functionality

### Home Page (`/`)
- Displays trending posts and local custom posts together.
- Fetches posts and comment counts from the API.
- Supports search and tag filtering.
- Handles loading, error, and empty state.
- Uses responsive layout and card-style previews.

### Blog Details Page (`/blog/:id` and `/comments/blog/:id`)
- Shows the selected post in full.
- Fetches comment data for API-based posts.
- Allows the user to like and bookmark posts.
- Supports editing and deleting local custom posts.
- Uses the same details view for both route shapes.

### Create Post Page (`/create`)
- Lets users create a new blog post locally.
- Saves the new post to persisted Jotai state.
- Redirects back to Home after creation.

### Bookmarks Page (`/bookmarks`)
- Lists all bookmarked posts.
- Allows removing bookmarks.
- Persists bookmarks across refreshes.

## Data and State

- API posts are fetched live from DummyJSON.
- Comments are fetched from the API per post.
- Custom posts are stored client-side only.
- Likes, bookmarks, and custom posts are persisted via `localStorage`.
- Search state is shared globally through Jotai.

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Jotai
- Sonner for toast notifications
- React Icons

## Notable Features

- Full-card click navigation from the post list to details.
- Persistent local state for custom posts, bookmarks, and likes.
- Content-aware fallback images for posts without API images.
- Support for both standard and alternate detail URLs.
- Simple custom post editing and deletion flow.
- Responsive styling and polished UI elements.

## Summary
BlogSpace is a polished React blog interface that blends remote API content with local user-created posts.
It demonstrates client-side routing, persistent application state, and a complete post/comment/bookmark workflow.
The current app is fully functional and ready to run with `npm install` and `npm run dev`.
