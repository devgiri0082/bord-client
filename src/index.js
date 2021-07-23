import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./Components/Redux/store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
