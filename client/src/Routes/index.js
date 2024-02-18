import React from 'react'
import { routesObj } from '../common/constants'

// const User = React.lazy(() => import('../components/User'))
const Auth = React.lazy(() => import('../components/Auth'))
const Home = React.lazy(() => import('../components/Home'))
const Vote = React.lazy(() => import('../components/Vote'))

const routes = [
  {
    path: routesObj.auth,
    component: Auth,
    requiresAuth: false,
    exact: false,
  },
  // {
  //   path: routesObj.home,
  //   component: Home,
  //   requiresAuth: false,
  //   exact: false,
  // },
  {
    path: routesObj.votingId,
    component: Vote,
    requiresAuth: false,
    exact: false,
  },

  // {
  //   path: routesObj.me,
  //   component: User,
  //   requiresAuth: true,
  //   exact: true,
  // },
]

export default routes
