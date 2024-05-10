import ReactDOM from "react-dom/client";

import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import ToggleColorModeProvider from "./utils/ToggleColorMode";
import { Provider } from "react-redux";

import store from "./app/store";
import { setupListeners } from "@reduxjs/toolkit/query";

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ToggleColorModeProvider>
      <App />
    </ToggleColorModeProvider>
  </Provider>
  // </React.StrictMode>
);
