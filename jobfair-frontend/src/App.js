import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux-flow/index";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback="loading">
          <LoginPage />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
