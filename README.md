# CINESPHERE

<p align="center">
  <img src="public/photo-collage.png.png" alt="App collage" width="900">
</p>

## Overview

CINESPHERE is a full-stack application designed to provide users with a seamless experience for browsing, managing, and sharing movie recommendations. Built using Next.js, this app leverages the TMDB API to allow users to search for movies, view relevant metadata, and manage their watchlists and watched lists. Additionally, CINESPHERE incorporates social features that enable users to connect with friends and share movie recommendations.

## Features

### Core Features

- Full-Stack Implementation: Built entirely with Next.js for a cohesive development experience.
- Local Database: Utilizes a MongoDB Docker container for local data storage.
- Deployment: Deployed on Vercel with MongoDB Atlas for cloud-based database management.
- Authentication: Simple authentication using Next.js built-in auth, JWT, and GitHub OAuth.
- Social Components: Users can invite friends, accept friend requests, and recommend movies.
- Movie Search: Search for movies by name using the TMDB API.
- Minimalist UI: Designed with a minimalist user interface using TailwindCSS and Shadcn components.
- Server Actions: Makes server-side requests through Next.js server actions.
- Dark and Light Mode: Supports both dark and light themes for user preference.
- Structured Library: A well-organized local library for wrapping TMDB requests.

## Project Structure

The project is organized into the following directories:
```bash
.
├─ actions/            # Contains server actions for handling data fetching and mutations.
├─ app/                # The main application directory where pages and components are defined.
├─ components/         # Reusable UI components that make up the app's interface.
├─ lib/                # Library functions for interfacing with the TMDB API and other utilities.
├─ models/             # Defines data models used throughout the application.
├─ types/              # TypeScript types and interfaces for type safety.
├─ public/             # Static assets like images and icons.
└─ README.md           # Aditional documentation.

```


## Getting Started

To get started with CINESPHERE, follow these steps:

``` bash
# clone
git clone https://github.com/<user>/<repo>.git
cd repo

# install
pnpm install    # or pip install -r requirements.txt, etc.

# dev start
pnpm run dev    # or make dev, flask run, cargo run, etc.

```
- Then: 

```bash
# Configure your environment variables in a .env.local file. Refer to .env.example for required variables.
# .env.example
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/dbname
JWT_SECRET=replace_with_a_secure_secret
```

- Also, Set up your MongoDB Docker container locally or connect to MongoDB Atlas.

- Open your browser and navigate to http://localhost:3000.


## Acknowledgements

- TMDB API (https://www.themoviedb.org/documentation/api) for movie data.
- Next.js (https://nextjs.org/) for the framework.
- TailwindCSS (https://tailwindcss.com/) for styling.
- Shadcn (https://ui.shadcn.com/) for UI components.

---