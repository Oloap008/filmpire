import { Grow, Rating, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled, useTheme } from "@mui/system";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  font-weight: bolder;
  text-decoration: none;
  ${({ theme }) =>
    theme.unstable_sx({
      [theme.breakpoints.up("xs")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    })}

  &:hover {
    cursor: pointer;
  }
`;

const MovieImg = styled("img")`
  border-radius: 20px;
  height: 300px;
  margin-bottom: 10px;

  &:hover {
    transform: scale(1.05);
  }

  ${({ theme }) =>
    theme.unstable_sx({
      [theme.breakpoints.up("lg")]: {
        height: "340px",
      },
    })};
`;

function Movie({ movie, i }) {
  const theme = useTheme();

  return (
    <Grid xs={12} sm={6} md={4} lg={3} xl={2.4} sx={{ padding: "10px" }}>
      <Grow in key={i} timeout={750}>
        <StyledLink to={`/movie/${movie.id}`}>
          <MovieImg
            alt={movie.title}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://dummyimage.com/200x300/fff/aaa"
            }
          />
          <Typography
            sx={{ color: theme.palette.text.primary }}
            className="movie-title"
            variant="h5"
          >
            {movie.title}
          </Typography>
          <Tooltip
            disableTouchListener
            title={`${Number(movie.vote_average).toFixed(1)} / 10`}
          >
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </StyledLink>
      </Grow>
    </Grid>
  );
}

export default Movie;
