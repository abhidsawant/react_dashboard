import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import Orders from '../pages/Orders/Orders';
import Products from '../pages/Products/Products';
import { ROUTES } from './routePath';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.LEADERBOARD} element={<Leaderboard />} />
      <Route path={ROUTES.ORDERS} element={<Orders />} />
      <Route path={ROUTES.PRODUCTS} element={<Products />} />
    </Routes>
  );
};

export default AppRoutes;
