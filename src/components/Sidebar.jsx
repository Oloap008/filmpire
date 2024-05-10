import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useGetGenresQuery } from "../services/TMDB";
import genreIcons from "../assets/genres";
import { useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";

const Image = styled("img")`
  width: 70%;
`;

const GenreImage = styled("img")`
  ${({ theme }) =>
    theme.unstable_sx({
      filter: theme.palette.mode === "dark" && "invert(1)",
    })}
`;

const categories = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top Rated",
    value: "top_rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const redLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  return (
    <>
      <Link
        to="/"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10% 0",
        }}
      >
        <Image
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt="Filmpire logo"
        />
      </Link>

      <Divider />

      <List>
        <ListSubheader>Categories</ListSubheader>
        {isFetching ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          categories.map(({ label, value }) => (
            <Link
              key={value}
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
              }}
              to="/"
            >
              <ListItemButton
                onClick={() => {
                  setMobileOpen((prevMobileOpen) => !prevMobileOpen);
                  dispatch(selectGenreOrCategory(value));
                }}
              >
                <ListItemIcon>
                  <GenreImage
                    src={genreIcons[label.toLowerCase()]}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>

      <Divider />

      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link
              key={name}
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
              }}
              to="/"
            >
              <ListItemButton
                onClick={() => {
                  setMobileOpen((prevMobileOpen) => !prevMobileOpen);
                  dispatch(selectGenreOrCategory(id));
                }}
              >
                <ListItemIcon>
                  <GenreImage
                    src={genreIcons[name.toLowerCase()]}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
}

export default Sidebar;
