import { useDispatch } from "react-redux";
import { incrementPage } from "../features/currentGenreOrCategory";
import Loader from "./Loader";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

function InfiniteScrolling({ isFetching, isInfiniteScrolling }) {
  const dispatch = useDispatch();

  const button = useIntersectionObserver(() => {
    if (!isFetching && isInfiniteScrolling) dispatch(incrementPage());
  }, [!isFetching]);

  // console.log(button);
  // if (isFetching) return <Loader />;

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: "2rem" }}>
      {!isFetching ? (
        <Button
          onClick={() => dispatch(incrementPage())}
          ref={button}
          disabled={isFetching}
          color="primary"
          variant="contained"
          sx={{ padding: "0.75rem 1.25rem" }}
        >
          Fetch More Movies
        </Button>
      ) : (
        <CircularProgress size="4rem" />
      )}
    </Box>
  );
}

export default InfiniteScrolling;
