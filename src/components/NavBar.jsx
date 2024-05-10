import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { createSessionId, fetchToken, fetchTokenOptions } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../features/auth";
import { useColorMode } from "../utils/ToggleColorMode";
import Search from "./Search";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

const Nav = styled("nav")`
  ${({ theme }) =>
    theme.unstable_sx({
      width: { sm: drawerWidth },
    })}
`;

function NavBar() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");
  const dispatch = useDispatch();

  const colorMode = useColorMode();

  useEffect(
    function () {
      async function logInUser() {
        if (token) {
          if (sessionIdFromLocalStorage) {
            const res = await fetch(
              `https://api.themoviedb.org/3/account/21234450?session_id=${sessionIdFromLocalStorage}`,
              fetchTokenOptions
            );

            const data = await res.json();

            // const { data: userData } = await res.json();
            dispatch(setUser({ data, sessionIdFromLocalStorage }));
            localStorage.setItem("accountId", data.id);
          } else {
            const sessionId = await createSessionId();

            const res = await fetch(
              `https://api.themoviedb.org/3/account/21234450?session_id=${sessionId}`,
              fetchTokenOptions
            );

            const data = await res.json();

            // const { data: userData } = await res.json();
            dispatch(setUser({ data, sessionIdFromLocalStorage }));
            localStorage.setItem("accountId", data.id);
          }
        }
      }

      logInUser();
    },
    [token, sessionIdFromLocalStorage, dispatch]
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
            ml: { sm: "240px" },
            flexWrap: { xs: "wrap" },
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <Box>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                  alt="Profile"
                  sx={{ width: 30, height: 30 }}
                />
              </Button>
            )}
          </Box>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <Box>
        <Nav>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={{ width: "230px" }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer variant="permanent">
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Nav>
      </Box>
    </>
  );
}

export default NavBar;
