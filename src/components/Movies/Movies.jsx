import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Pagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import { useState } from "react";

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.genreOrCategory
  );
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 16 : 18;

  if (isFetching)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress size="4rem" />
      </Box>
    );

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
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      {/* <Pagination /> */}
    </div>
  );
}

export default Movies;
