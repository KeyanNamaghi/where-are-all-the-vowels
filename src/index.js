import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import * as serviceWorker from './serviceWorker'
import rootReducer from './reducers/rootReducers'
import mySaga from './sagas/rootSaga'
import './index.css'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

sagaMiddleware.run(mySaga)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
