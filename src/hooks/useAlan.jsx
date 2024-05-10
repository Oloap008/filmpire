import { useEffect } from "react";
import { useColorMode } from "../utils/ToggleColorMode";
import alanBtn from "@alan-ai/alan-sdk-web";
import { fetchToken, logout } from "../utils";
import { useNavigate } from "react-router-dom";
import {
  searchMovie,
  selectGenreOrCategory,
} from "../features/currentGenreOrCategory";
import { useDispatch } from "react-redux";

function useAlan() {
  const { setMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: import.meta.env.VITE_REACT_APP_ALAN_API_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;

            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        }

        if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        }

        if (command === "logout") logout();

        if (command === "login") fetchToken();

        if (command === "search") dispatch(searchMovie(query));
      },
    });
  }, [setMode, navigate, dispatch]);
}

export default useAlan;
