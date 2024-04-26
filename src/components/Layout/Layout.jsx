import { styled } from "@mui/system";
import { Box, CssBaseline } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Main = styled("main")`
  flex-grow: 1;
  padding: 2em;
`;

function Layout() {
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
    </Box>
  );
}

export default Layout;
