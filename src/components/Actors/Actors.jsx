import { useNavigate, useParams } from "react-router-dom";
import {
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import { Box, styled } from "@mui/system";
import { Button, CircularProgress, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@emotion/react";
import { ArrowBack } from "@mui/icons-material";
import MovieList from "../MovieList/MovieList";

const Poster = styled("img")`
  border-radius: 20px;
  box-shadow: 0.5em 0.5em 1em;
  max-width: 90%;
  object-fit: "cover";
`;

function Actors() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const page = 1;

  const { data: actor, isFetching, error } = useGetActorQuery(id);
  const { data: actorMovies, isFetching: isFetchingActorMovies } =
    useGetMoviesByActorIdQuery({
      id,
      page,
    });

  if (isFetching || isFetchingActorMovies) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 lg={5} xl={4}>
          <Poster
            src={`https://image.tmdb.org/t/p/w780/${actor?.profile_path}`}
            alt={actor?.name}
          />
        </Grid2>
        <Grid2
          lg={7}
          xl={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {actor?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(actor?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {actor?.biography || "Sorry, no biography yet..."}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${actor?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid2>
      </Grid2>
      <Box margin="2rem 0">
        <Typography variant="h4" gutterBottom align="center">
          Movies
        </Typography>
        {actorMovies ? (
          <MovieList movies={actorMovies} numberOfMovies={12} />
        ) : (
          <Box>Sorry nothing was found.</Box>
        )}
      </Box>
    </>
  );
}

export default Actors;
