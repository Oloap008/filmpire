import { Box, CssBaseline } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { styled } from "@mui/system";

import Movies from "./Movies/Movies";
import Actors from "./Actors/Actors";
import MovieInformation from "./MovieInformation/MovieInformation";
import Profile from "./Profile/Profile";
import NavBar from "./NavBar/NavBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/movies/:id",
    element: <MovieInformation />,
  },
  {
    path: "/actors/:id",
    element: <Actors />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
]);

const Main = styled("main")`
  flex-grow: 1;
  padding: 2em;
`;

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <CssBaseline />
      <NavBar />
      <Main>
        <Box
          sx={{
            height: "70px",
          }}
        />
        <RouterProvider router={router} />
      </Main>
    </Box>
  );
}

export default App;
