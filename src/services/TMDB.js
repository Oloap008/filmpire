import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_REACT_APP_TMDB_KEY;
const tmdbReadAccessToken = import.meta.env
  .VITE_REACT_APP_TMDB_READ_ACCESS_TOKEN;
const page = 1;

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
      query: () => `movie/popular?page=${page}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
