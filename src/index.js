import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./Components/Redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
