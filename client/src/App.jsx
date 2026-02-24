import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DonorRegistration from './pages/DonorRegistration';
import Inventory from './pages/Inventory';
import BloodRequest from './pages/BloodRequest';
import MatchingResult from './pages/MatchingResult';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="donors" element={<DonorRegistration />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="request" element={<BloodRequest />} />
        <Route path="match/:requestId" element={<MatchingResult />} />
      </Route>
    </Routes>
  );
}

export default App;
