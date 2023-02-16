
import { Routes, Route } from 'react-router-dom';

import { CallsProvider } from './contexts/CallsContext';
import { AuthProvider } from './contexts/AuthContext';

import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import RequireAuth from './components/Auth/RequireAuth';


function App() {
  return (
    <AuthProvider>
      <CallsProvider>
        <Routes>
            <Route path="/" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </CallsProvider>
    </AuthProvider>
  );
}

export default App
