import ReactDOM from 'react-dom'
import App from './App'
import './styles/index.scss'
import {
  VotingProvider,
  ShowPopupProvider,
  LoginProvider,
} from './context/Provider'
import Toast from './components/Toast'

ReactDOM.render(
  <ShowPopupProvider>
    <LoginProvider>
      <VotingProvider>
        <App />
        <Toast />
      </VotingProvider>
    </LoginProvider>
  </ShowPopupProvider>,
  document.getElementById('root')
)
