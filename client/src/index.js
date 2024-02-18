import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalStyle } from './GlobalStyle'
import Toast from './components/Toast'
import { LoginProvider, ShowPopupProvider } from './context/Provider'

// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ShowPopupProvider>
    <LoginProvider>
      <GlobalStyle />
      <App />
      <Toast />
    </LoginProvider>
  </ShowPopupProvider>
)
