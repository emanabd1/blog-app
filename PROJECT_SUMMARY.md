# Blog App Project Summary

## Overview
This is a React blog application built with Vite, React Router, Jotai, and Tailwind CSS. The app fetches blog posts and comments from the DummyJSON API. It also allows the user to create custom posts locally, bookmark posts, like posts, and filter/search the post list.

## Project Structure

- `src/App.jsx`
  - Main application shell.
  - Defines routes for Home, Blog Details, Create Post, Bookmarks, and NotFound.
  - Always renders `Navbar` and `Footer`.

- `src/components/Navbar.jsx`
  - Shows navigation links to Home, Create Post, Bookmarks.
  - Displays a search input connected to `searchAtom`.
  - Displays bookmark count from `bookmarksAtom`.

- `src/components/BlogCard.jsx`
  - Receives `post` as a prop.
  - Shows image, title, excerpt, tags, like button, bookmark button, Edit/Delete buttons for custom posts, and Read More link.
  - Uses `jotai` atoms for bookmarks, likes, and custom posts.
  - Uses a fallback image behavior when `post.image` is missing or fails to load.

- `src/components/BlogForm.jsx`
  - Reusable post creation form.
  - Manages title, body, image preview, and validation state with `useState`.
  - Submits a new local post object to `onSubmit`.

- `src/pages/Home.jsx`
  - Fetches post list from `getPosts()` on mount.
  - Combines API posts and local custom posts from `customPostsAtom`.
  - Builds a tag filter list from all post tags.
  - Filters posts by selected tag and search query.
  - Shows loading, error, and empty states.

- `src/pages/BlogDetails.jsx`
  - Reads `id` from `useParams()`.
  - Uses `customPostsAtom` to check for local post overrides.
  - If the post is custom, loads it locally and optionally enables edit mode via `?edit=1`.
  - Otherwise, fetches a single post and comments from DummyJSON.
  - Supports like, bookmark, edit, and delete actions.
  - Shows comments via `CommentCard`.

- `src/pages/CreatePost.jsx`
  - Renders `BlogForm`.
  - Adds new custom post to `customPostsAtom`.
  - Shows an alert and navigates back to Home.

- `src/pages/Bookmarks.jsx`
  - Reads `bookmarksAtom`.
  - Displays saved posts.
  - Allows removing bookmarks.

- `src/services/api.js`
  - Contains `getPosts()`, `getPost(id)`, and `getComments(id)`.
  - Uses `https://dummyjson.com`.
  - `getPosts()` fetches `?limit=10` posts.
  - `getPost(id)` returns a single post.
  - `getComments(id)` returns comments for the post.

- `src/atoms/postAtom.jsx`
  - Uses Jotai atom for custom post list.
  - Reads/writes `blog-app-custom-posts` in `localStorage`.

- `src/atoms/bookmarkAtom.jsx`
  - Uses Jotai atom for bookmarks.
  - Reads/writes `blog-app-bookmarks` in `localStorage`.

- `src/atoms/likesAtom.jsx`
  - Uses Jotai atom for liked post IDs.
  - Reads/writes `blog-app-liked-posts` in `localStorage`.

- `src/atoms/searchAtom.jsx`
  - Uses Jotai atom for search query state.

## What the Project Does

### Home Page (`/`)
- Fetches the list of posts from DummyJSON.
- Shows local custom posts and fetched posts together.
- Filters posts by search term and selected tag.
- Shows loading state while fetching.
- Shows error message if fetch fails.
- Shows a tag filter row.
- Renders each post using `BlogCard`.

### Blog Details Page (`/blog/:id`)
- Fetches a single post by ID from DummyJSON if it is not a local custom post.
- Fetches comments for the post.
- Allows bookmarking the post.
- Allows liking the post.
- If the post is local, allows editing and deleting.
- Shows an edit form in edit mode.

### Create Post Page (`/create`)
- Shows a form with Title, Body, and image upload.
- Validates that Title and Body are not empty.
- Saves the post locally in `customPostsAtom`.
- Redirects back to Home after creation.

### Bookmarks Page (`/bookmarks`)
- Shows bookmarked posts from `bookmarksAtom`.
- Shows an empty state when there are no bookmarks.
- Lets the user remove bookmarks.

## State Management and Persistence

- `customPostsAtom` stores locally created posts.
- `bookmarksAtom` stores bookmarked posts.
- `likedPostsAtom` stores liked post IDs.
- `searchAtom` stores the search input value.
- All atoms persist to `localStorage` to survive page refresh.

## API Integration

- `getPosts()` fetches posts from `https://dummyjson.com/posts?limit=10`.
- `getPost(id)` fetches a single post.
- `getComments(id)` fetches comments for a post.
- The app uses fetched posts for Home and Blog Details.
- Custom posts are local only and do not send anything to DummyJSON.

## Extra Notes

- The app uses React Router for dynamic routing and navigation.
- It uses functional React components with hooks.
- The card UI is styled using Tailwind CSS classes.
- The app includes a search box in the Navbar that filters on Home.
- The `BlogCard` component supports both API posts and custom local posts.
- Editing a custom post is done on the Blog Details page with `?edit=1`.
- The delete button removes a custom post from local storage and bookmarks.

## Summary
This project is a full implementation of the requested React blog app. It includes:
- API data fetching with comments
- dynamic routing
- bookmarks in global Jotai state
- local custom post creation
- persistent local storage
- search and tag filtering
- custom post edit/delete behavior

All functionality is implemented without adding unrelated features, and the project uses the current source code exactly as present in the workspace.
