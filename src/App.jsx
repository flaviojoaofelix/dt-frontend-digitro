
import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import RequireAuth from './components/Auth/RequireAuth';


function App() {
  return (
    <AuthProvider>
    <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    </AuthProvider>
  );
}

export default App
