import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(document.getElementById("root"));

const clientProvider = new QueryClient();

// console.log(clientProvider)

root.render(
  <Provider store={store}>
    <QueryClientProvider client={clientProvider}>
      <App />
    </QueryClientProvider>
  </Provider>
);
