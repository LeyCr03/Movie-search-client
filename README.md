# TMDB Movie Recomendations app

## Goal:

The objective here is create a full-stack app consuming tmdb api.

Refer to `https://developer.themoviedb.org/docs/getting-started`

Getting Api key `https://www.themoviedb.org/settings/api` (You must first create an account)

## Description: 

We want an app where you can browse into tmdb database to search movies seen the relevant metadata, then you can add to a `watch me later` list or similar, also mark as seen a movie, so you have two libraries, the seen and watch list,
also is intended to have a social component on the application where you can recomend a movie to a friend.

## Core Features:

- FullStack using only Next.js 
- Database local with `mongodb` docker container
- For Deployment use Vercel and mongodb atlas 
---

- Simple auth using nextjs built in auth
- friends and recomendations capabilities
- Search movies by author name etc...
- Minimalist ui, (very minimalist)
- Use tailiwndcss and shadcn if needed
- Dont use additional packages except the shadcn defaults
- Use server actions to make server side requests. 
- Support white and dark mode 
- Make a well structured local library wrapping tmdb requests 


## to do
- middleware
- .en.local
- social
- profile
- watched & watchlist
- auth