import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Movie from "../Movie/Movie";

function MovieList({ movies }) {
  return (
    <Grid2
      container
      sx={{
        flexWrap: "wrap",
        justifyContent: "space-between",
        overflow: "auto",
        sm: { justifyContent: "center" },
      }}
    >
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid2>
  );
}

export default MovieList;