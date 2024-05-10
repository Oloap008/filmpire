import { Link, useParams } from "react-router-dom";
import {
  tmdbReadAccessToken,
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../services/TMDB";
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/system";

import genreIcons from "../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import {
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie,
  PlusOne,
  Remove,
  Theaters,
} from "@mui/icons-material";
import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import { userSelector } from "../features/auth";
import Loader from "./Loader";

const Poster = styled("img")`
  border-radius: 20px;
  box-shadow: 0.5em 1em 1em rgb(64, 64, 70);
  width: 80%;
  ${({ theme }) =>
    theme.unstable_sx({
      [theme.breakpoints.down("lg")]: {
        margin: "0 auto",
        width: "50%",
        // height: "350px",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "0 auto",
        width: "100%",
        height: "350px",
        marginBottom: "30px",
      },
    })}
`;

const GenreIcon = styled("img")`
  margin-right: 10px;
  ${({ theme }) =>
    theme.unstable_sx({
      filter: theme.palette.mode === "dark" && "invert(1)",
    })}
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  ${({ theme }) =>
    theme.unstable_sx({
      [theme.breakpoints.down("sm")]: {
        padding: "0.5rem 1rem",
      },
    })}
`;

const IFrame = styled("iframe")`
  width: 50%;
  height: 50%;
  ${({ theme }) =>
    theme.unstable_sx({
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        height: "90%",
      },
    })}
`;
const ActorImage = styled("img")`
  width: 100%;
  max-width: 7em;
  height: 8em;
  object-fit: cover;
  border-radius: 10px;
`;

function MovieInformation() {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorites] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: "/recommendations",
      movieId: id,
    });

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(
    function () {
      setIsMovieFavorites(
        !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
      );
    },
    [favoriteMovies, data]
  );

  useEffect(
    function () {
      setIsMovieWatchlisted(
        !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
      );
    },
    [watchlistMovies, data]
  );

  async function addToFavorites() {
    await fetch(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/favorite?session_id=${localStorage.getItem("session_id")}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${tmdbReadAccessToken}`,
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: id,
          favorite: !isMovieFavorited,
        }),
      }
    );

    setIsMovieFavorites((state) => !state);
  }

  async function addToWatchlist() {
    await fetch(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/watchlist?session_id=${localStorage.getItem("session_id")}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${tmdbReadAccessToken}`,
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: id,
          watchlist: !isMovieWatchlisted,
        }),
      }
    );

    setIsMovieWatchlisted((state) => !state);
  }

  if (isFetching || isRecommendationsFetching) return <Loader />;

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <Link to="/">
          Seems like something must have gone wrong - Click here to go back
        </Link>
      </Box>
    );
  }

  return (
    <Grid container className="container_space-around">
      <Grid
        sm={12}
        lg={4}
        sx={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}
      >
        <Poster
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid
          className="container_space-around"
          sx={{ flexDirection: { md: "row", xs: "column" } }}
        >
          <Box display="flex" align="center" justifyContent="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                marginLeft: "10px",
              }}
            >
              {Number(data?.vote_average).toFixed(1)} / 10
            </Typography>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language:{" "}
            {data?.spoken_languages[0].english_name}
          </Typography>
        </Grid>
        <Grid className="container_space-around" sx={{ flexWrap: "wrap" }}>
          {data?.genres?.map((genre) => (
            <StyledLink
              key={genre.name}
              to={`/`}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <GenreIcon
                src={genreIcons[genre.name.toLowerCase()]}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </StyledLink>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography sx={{ marginBottom: "2rem" }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character) =>
                  character.profile_path && (
                    <Grid
                      key={character.name}
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      sx={{ textDecoration: "none" }}
                    >
                      <ActorImage
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/").at(0)}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid container sx={{ marginTop: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "5px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Grid xs={12} sm={6}>
              <ButtonGroup size="medium" variant="outlined" fullWidth>
                <Button
                  target="_blank"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<Movie />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid xs={12} sm={6}>
              <ButtonGroup size="medium" variant="outlined" fullWidth>
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  {/* {isMovieWatchlisted
                    ? "Remove from Watchlist"
                    : "Add to Watchlist"} */}
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    sx={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={15} />
        ) : (
          <Box>Sorry nothing was found.</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <IFrame
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}?autoplay=1`}
          />
        )}
      </Modal>
    </Grid>
  );
}

export default MovieInformation;
