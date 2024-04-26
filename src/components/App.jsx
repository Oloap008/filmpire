import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Movies from "./Movies/Movies";
import Actors from "./Actors/Actors";
import MovieInformation from "./MovieInformation/MovieInformation";
import Profile from "./Profile/Profile";
import Layout from "./Layout/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
