import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux-flow/index'
import 'antd/dist/antd.min.css'
import './App.css'
import AppRouter from './router/AppRouter'
import ErrorHandler from './components/ErrorHandler/ErrorHandler'
import 'animate.css'

function App() {
  return (
    <BrowserRouter>
      <ErrorHandler>
        <Provider store={store}>
          <Suspense fallback="loading">
            <AppRouter />
          </Suspense>
        </Provider>
      </ErrorHandler>
    </BrowserRouter>
  )
}

export default App
