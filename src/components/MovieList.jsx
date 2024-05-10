import Grid from "@mui/material/Unstable_Grid2";
import Movie from "./Movie";

function MovieList({ movies, excludeFirst, numberOfMovies }) {
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid container>
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
