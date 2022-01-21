import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux-flow/index";
import "./App.css";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback="loading">
          <Navbar />
          <AppRouter />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
