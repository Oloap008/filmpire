import { useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useGetMoviesQuery } from "../services/TMDB";
import MovieList from "./MovieList";
import Loader from "./Loader";
import InfiniteScrolling from "./InfiniteScrolling";
import FeaturedMovie from "./FeaturedMovie";

function Movies() {
  const { genreIdOrCategoryName, searchQuery, page, isInfiniteScrolling } =
    useSelector((state) => state.genreOrCategory);

  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });

  const xl = useMediaQuery((theme) => theme.breakpoints.only("xl"));
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = xl ? 16 : lg ? 17 : 19;

  if (isFetching && page === 1) return <Loader />;

  if (!data.results.length)
    return (
      <Box sx={{ display: "flex", alignItems: "center", mt: "20px" }}>
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );

  if (error) return "An error has occured.";

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} excludeFirst numberOfMovies={numberOfMovies} />
      <InfiniteScrolling
        isFetching={isFetching}
        isInfiniteScrolling={isInfiniteScrolling}
      />
    </div>
  );
}

export default Movies;
