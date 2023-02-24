import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import useSocket from '../../hooks/useSocket';

import Header from '../../components/Layout/Header';
import CallsList from '../../components/Calls/CallsList';
import CallDetails from '../../components/Calls/CallDetails';

function Dashboard() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const { socket, socketAlerts, socketConnect, socketDisconnect, socketEndCall } = useSocket();

  const handleConnection = () => {
    const {
      user: { username, maxCalls },
    } = auth;

    if (socket.connected) {
      socketDisconnect(username);
    } else {
      socketConnect(username, maxCalls);
    }
  };

  const signOut = () => {
    socketDisconnect();
    auth.signOut(() => navigate('/'));
  };

  useEffect(() => {
    const {
      user: { username, maxCalls },
    } = auth;

    socketConnect(username, maxCalls);
  }, []);

  return (
    <>
      <Header isConnected={socket.connected} handleConnection={handleConnection} signOut={signOut} />
      <div className="container mt-2 shadow"></div>
      <main className="container p-3">
        <div className="row bg-white rounded-1 py-3">
          <section className="col-sm-4 border-end">
            <CallsList isConnected={socket.connected} alertMessage={socketAlerts} />
          </section>
          <section className="col-sm-8">
            <CallDetails endCall={socketEndCall} />
          </section>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
