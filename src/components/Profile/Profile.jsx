import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box } from "@mui/system";
import { Button, CircularProgress, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/TMDB";
import RatedCards from "../RatedCards/RatedCards";
import { useEffect } from "react";

function Profile() {
  const { user } = useSelector(userSelector);
  const {
    data: favoriteMovies,
    isFetching: isFetchingFavotrites,
    refetch: refetchFavorites,
  } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const {
    data: watchlistMovies,
    isFetching: isFetchingWatchlisted,
    refetch: refetchWatchlisted,
  } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(
    function () {
      refetchFavorites();
      refetchWatchlisted();
    },
    [refetchFavorites, refetchWatchlisted]
  );

  if (isFetchingFavotrites || isFetchingWatchlisted) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favorites or watchlist some movies to see them here.
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
}

export default Profile;
