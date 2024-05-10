import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Movies from "./components/Movies";
import MovieInformation from "./components/MovieInformation";
import Actors from "./components/Actors";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Movies />,
      },
      {
        path: "/movie/:id",
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
