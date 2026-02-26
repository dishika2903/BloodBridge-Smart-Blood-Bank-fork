import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DonorRegistration from './pages/DonorRegistration';
import Inventory from './pages/Inventory';
import BloodRequest from './pages/BloodRequest';
import MatchingResult from './pages/MatchingResult';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="donors" element={<DonorRegistration />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="request" element={<BloodRequest />} />
          <Route path="match/:requestId" element={<MatchingResult />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
