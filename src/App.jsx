import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Orders from './pages/Orders/Orders';
import Products from './pages/Products/Products';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
