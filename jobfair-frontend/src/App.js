import './App.scss';
import 'animate.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import ErrorHandlerComponent from './components/commons/ErrorHandler/ErrorHandler.component';
import React, { Suspense } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import store from './redux-flow/index';

function App() {
  return (
    <BrowserRouter>
      <ErrorHandlerComponent>
        <Provider store={store}>
          <Suspense fallback='loading'>
            <Scrollbars
              style={{ width: '100%', height: '100%' }}
              hideTracksWhenNotNeeded={true}
              autoHide={true}
              autoHideTimeout={1000}
              autoHideDuration={200}>
              <AppRouter />
            </Scrollbars>
          </Suspense>
        </Provider>
      </ErrorHandlerComponent>
    </BrowserRouter>
  );
}

export default App;
