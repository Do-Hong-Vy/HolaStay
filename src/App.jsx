import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/client/Home';
import Explore from './pages/client/Explore';
import HouseDetail from './pages/client/HouseDetail';
import HouseReviews from './pages/client/HouseReviews';
import AdminDashboard from './pages/admin/AdminDashboard';
import HouseForm from './pages/admin/HouseForm';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="house/:id" element={<HouseDetail />} />
          <Route path="house/:id/reviews" element={<HouseReviews />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add" element={<HouseForm />} />
          <Route path="edit/:id" element={<HouseForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
