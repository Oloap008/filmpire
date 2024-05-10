import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbReadAccessToken = import.meta.env
  .VITE_REACT_APP_TMDB_READ_ACCESS_TOKEN;

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.themoviedb.org/3",
  prepareHeaders: (headers) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    headers.set("Authorization", `Bearer ${tmdbReadAccessToken}`);
    return headers;
  },
});

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery,
  endpoints: (builder) => ({
    // GET Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?language=en`,
    }),
    // GET Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, searchQuery, page }) => {
        // GET Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}`;
        }

        // GET Movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        // GET Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}`;
        }

        // GET Popular Movies by default
        return `movie/popular?page=${page}`;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (newItems.page === 1) {
          currentCache.results = newItems.results;
        } else {
          currentCache.results.push(...newItems.results);
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    // GET Movie
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits`,
    }),

    // GET User Specific Lists
    getRecommendations: builder.query({
      query: ({ movieId, list }) => `movie/${movieId}/${list}`,
    }),

    // GET Actor
    getActor: builder.query({
      query: (id) => `person/${id}`,
    }),

    // Get Movies of a Actor
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `discover/movie?with_cast=${id}&page=${page}`,
    }),

    // Get user favorites / watchlist
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `account/${accountId}/${listName}?session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
