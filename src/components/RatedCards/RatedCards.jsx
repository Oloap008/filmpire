import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Movie from "../Movie/Movie";

function RatedCards({ title, data }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" sx={{}}>
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;
