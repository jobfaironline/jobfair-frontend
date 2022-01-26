import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux-flow/index";
import "antd/dist/antd.min.css";
import "./App.css";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback="loading">
          <AppRouter />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
