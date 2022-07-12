import './App.less';
import 'animate.css';
import { BrowserRouter } from 'react-router-dom';
import { LoadingComponent } from './components/commons/Loading/Loading.component';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import ErrorHandlerComponent from './components/commons/ErrorHandler/ErrorHandler.component';
import React, { Suspense } from 'react';
import store from './redux-flow/index';

function App() {
  return (
    <BrowserRouter>
      <ErrorHandlerComponent>
        <Provider store={store}>
          <Suspense fallback={<LoadingComponent isWholePage={true} />}>
            <AppRouter />
          </Suspense>
        </Provider>
      </ErrorHandlerComponent>
    </BrowserRouter>
  );
}

export default App;
