import { styled } from "@mui/system";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import useAlan from "../hooks/useAlan";
import { useRef } from "react";

const Main = styled("main")`
  flex-grow: 1;
  padding: 2em;
  /* width: 100%; */
`;

function Layout() {
  const alanBtnContainer = useRef(null);
  useAlan();

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
        <Outlet />
      </Main>

      <div ref={alanBtnContainer} />
    </Box>
  );
}

export default Layout;
