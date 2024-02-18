import './app.styles.scss'

import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import routes from './Routes'
import AuthGuard from './Guard/Auth'
import { Suspense } from 'react'

const App = () => {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Switch>
          {routes.map((route, index) => (
            <AuthGuard
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
              requiresAuth={route.requiresAuth}
            />
          ))}
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
