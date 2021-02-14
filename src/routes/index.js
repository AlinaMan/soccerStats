import Leagues from './Leagues'
import Teams from './Teams'
import Team from './Team'
import NotFound from './NotFound'

const routes = [
  {
    path: '/leagues',
    component: Leagues,
  },
  {
    path: '/teams',
    component: Teams,
  },
  {
    path: '/teams/:id',
    component: Team,
  },
  {
    path: '/404',
    component: NotFound,
  },
]

export default routes