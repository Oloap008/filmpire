import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { Search as SeachIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../features/currentGenreOrCategory";
import { useLocation } from "react-router-dom";

const StyledSearch = styled("div")`
  ${({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
  })}
`;

function Search() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  if (location.pathname !== "/") return null;

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      dispatch(searchMovie(query));
    }
  }

  return (
    <StyledSearch>
      <TextField
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            marginTop: "-10px",
            marginBottom: "10px",
          },
          color: theme.palette.mode === "light" && "black",
          filter: theme.palette.mode === "light" && "invert(1)",
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SeachIcon />
            </InputAdornment>
          ),
        }}
      />
    </StyledSearch>
  );
}

export default Search;
