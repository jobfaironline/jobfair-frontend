import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux-flow/index'
import 'antd/dist/antd.min.css'
import './App.css'
import AppRouter from './router/AppRouter'
import ErrorHandlerComponent from './components/ErrorHandler/ErrorHandler.component'
import 'animate.css'

function App() {
  return (
    <BrowserRouter>
      <ErrorHandlerComponent>
        <Provider store={store}>
          <Suspense fallback="loading">
            <AppRouter />
          </Suspense>
        </Provider>
      </ErrorHandlerComponent>
    </BrowserRouter>
  )
}

export default App
