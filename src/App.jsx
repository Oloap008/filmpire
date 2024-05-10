import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";

const Layout = lazy(() => import("./components/Layout"));
const Movies = lazy(() => import("./components/Movies"));
const MovieInformation = lazy(() => import("./components/MovieInformation"));
const Actors = lazy(() => import("./components/Actors"));
const Profile = lazy(() => import("./components/Profile"));

// import Layout from "./components/Layout";
// import Movies from "./components/Movies";
// import MovieInformation from "./components/MovieInformation";
// import Actors from "./components/Actors";
// import Profile from "./components/Profile";

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
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />;
    </Suspense>
  );
}

export default App;
