import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import QueriesPage from '../Pages/Queries';
import QueriesDetails from '../Pages/QueriesDetails';

const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/queries/create': QueriesPage,
  '/queries':QueriesDetails,
};

export default routes;
