import React from 'react'
import { routesObj } from '../common/constants'

const Auth = React.lazy(() => import('../components/Auth'))
const CanInfo = React.lazy(() => import('../components/CanInfo'))
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
  //   component: CanInfo,
  //   requiresAuth: false,
  //   exact: false,
  // },
  {
    path: routesObj.vote,
    component: Vote,
    requiresAuth: false,
    exact: false,
  },
]

export default routes
