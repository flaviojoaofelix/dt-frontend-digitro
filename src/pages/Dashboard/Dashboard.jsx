import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { AuthContext } from '../../contexts/AuthContext';
import { CallsContext } from '../../contexts/CallsContext';

import Header from '../../components/Layout/Header';
import CallsList from '../../components/Calls/CallsList';
import CallDetails from '../../components/Calls/CallDetails';

const socket = io('http://dev.digitro.com', {
  transports: ['websocket', 'polling', 'flashsocket'],
  path: '/callcontrol',
  forceNew: true,
  reconnectionAttempts: 3,
  timeout: 2000,
});

function Dashboard() {
  const [alertMessage, setAlertMessage] = useState(false);

  const { addCall, cleanCalls, removeCall, deselectCall } = useContext(CallsContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const connect = () => {
    socket.connect();
    socket.emit('USER_CONNECT', {
      username: auth.user.username,
      maxCalls: auth.user.maxCalls,
    });
  };

  const disconnect = () => {
    socket.emit('USER_DISCONNECT', {
      username: auth.user.username,
    });
    cleanCalls();
    deselectCall();
    handleAlert({ type: 'info', title: 'USER_CONNECTION_ERROR', message: 'Desconectando...' });
    socket.disconnect();
  };

  const signOut = () => {
    disconnect();
    auth.signOut(() => navigate('/'));
  };

  const endCall = (callId) => {
    socket.emit('END_CALL', {
      callId,
    });
  };

  const handleAlert = ({ type, title, message }) => {
    setAlertMessage({ type, title, message });

    setTimeout(() => setAlertMessage(false), 8000);
  };

  useEffect(() => {
    if (auth.user) {
      connect();
    }

    socket.on('USER_CONNECTED', (data) => {
      console.log(data);
    });

    socket.on('USER_CONNECTION_ERROR', ({ error }) => {
      handleAlert({ type: 'warning', title: 'USER_CONNECTION_ERROR', message: error });
    });

    socket.on('USER_DISCONNECT', (data) => {
      console.log(data);
    });

    socket.on('USER_DISCONNECTED', (data) => {
      handleAlert({ type: 'success', title: 'USER_CONNECTION_ERROR', message: 'Desconectado!' });
      console.log(data);
    });

    socket.on('USER_DISCONNECTION_ERROR', ({ error }) => {
      handleAlert({ type: 'warning', title: 'USER_DISCONNECTION_ERROR', message: error });
    });

    socket.on('NEW_CALL', (data) => {
      console.log(data);
      addCall(data);
      socket.emit('NEW_CALL_ANSWERED', {
        callId: data.callId,
      });
    });

    socket.on('NEW_CALL_ANSWERED', (data) => {
      console.log(data);
    });

    socket.on('NEW_CALL_ERROR', ({ error }) => {
      handleAlert({ type: 'warning', title: 'NEW_CALL_ERROR', message: error });
    });

    socket.on('END_CALL', (data) => {
      console.log(data);
    });

    socket.on('CALL_ENDED', ({ callId }) => {
      removeCall(callId);
      handleAlert({ type: 'success', title: 'CALL_ENDED', message: 'Chamada finalizada!' });
    });

    socket.on('END_CALL_ERROR', ({ error }) => {
      handleAlert({ type: 'danger', title: 'END_CALL_ERROR', message: error });
    });

    return () => {
      socket.off('USER_CONNECTED');
      socket.off('USER_DISCONNECT');
      socket.off('USER_DISCONNECTED');
      socket.off('USER_DISCONNECTION_ERROR');
      socket.off('NEW_CALL');
      socket.off('NEW_CALL_ANSWERED');
      socket.off('NEW_CALL_ERROR');
      socket.off('END_CALL');
      socket.off('CALL_ENDED');
      socket.off('END_CALL_ERROR');
    };
  }, []);

  return (
    <>
      <Header isConnected={socket.connected} connect={connect} disconnect={disconnect} signOut={signOut} />
      <div className="container mt-2 shadow"></div>
      <main className="container p-3">
        <div className="row bg-white rounded-1 py-3">
          <section className="col-sm-4 border-end">
            <CallsList isConnected={socket.connected} alertMessage={alertMessage} />
          </section>
          <section className="col-sm-8">
            <CallDetails endCall={endCall} />
          </section>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
