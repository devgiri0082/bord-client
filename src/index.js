import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./Components/Redux/store";

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
