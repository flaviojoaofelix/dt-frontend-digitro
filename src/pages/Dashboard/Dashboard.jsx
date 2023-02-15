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
  timeout: 2000
});

function Dashboard() {
  const [apiError, setApiError] = useState(false);

  const { addCall, cleanCalls, removeCall } = useContext(CallsContext);
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  
  const connect = () => {
    socket.connect();
    socket.emit('USER_CONNECT', {
      username: auth.user.username,
      maxCalls: auth.user.maxCalls,
    });
  };

  const disconnect = () => {
    socket.emit('USER_DISCONNECT', {
      username: 'Teste',
    });
    socket.disconnect();
    cleanCalls();
    auth.signOut(() => navigate('/'));
  };

  const endCall = (callId) => {
    socket.emit('END_CALL', {
      callId,
    })
  };

  const handleError = ({ type, message }) => {
    setApiError({ type, message })

    setTimeout(() => setApiError(false), 8000)
  }

  useEffect(() => {
    if (auth.user) {
      connect();
    }

    socket.on('USER_CONNECTED', (data) => {
      console.log(data);
    });

    socket.on('USER_DISCONNECT', (data) => {
      console.log(data);
    })

    socket.on('USER_DISCONNECTED', (data) => {
      console.log(data)
    })

    socket.on('USER_DISCONNECTION_ERROR', ({ error }) => {
      handleError({ type: 'USER_DISCONNECTION_ERROR', message: error });
    })

    socket.on('NEW_CALL', (data) => {
      console.log(data)
      addCall(data)
    })

    socket.on('NEW_CALL_ANSWERED', (data) => {
      console.log(data)
    })

    socket.on('NEW_CALL_ERROR', ({ error }) => {
      handleError({ type: 'NEW_CALL_ERROR', message: error });
    })

    socket.on('END_CALL', (data) => {
      console.log(data)
    })

    socket.on('CALL_ENDED', ({ callId }) => {
      removeCall(callId);
    })

    socket.on('END_CALL_ERROR', ({ error }) => {
      handleError({ type: 'END_CALL_ERROR', message: error });
    })

    return () => {
      socket.off('USER_CONNECTED');
      socket.off('USER_DISCONNECT');
      socket.off('USER_DISCONNECTED');
      socket.off('USER_DISCONNECTION_ERROR')
      socket.off('NEW_CALL')
      socket.off('NEW_CALL_ANSWERED')
      socket.off('NEW_CALL_ERROR')
      socket.off('END_CALL')
      socket.off('CALL_ENDED')
      socket.off('END_CALL_ERROR')
    }
  }, [])

  return (
    <div className="App">
      <Header logout={disconnect} />
      { apiError && (<span>{apiError.type}: {apiError.message}</span>) }
      <CallsList />
      <CallDetails endCall={endCall} />
    </div>
  );
};

export default Dashboard;
