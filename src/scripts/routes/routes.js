import Home from '../views/pages/home';
import favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': Home,
  '/home': Home,
  '/favorite': favorite,
  '/detail/:id': Detail,
};

export default routes;
