import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { AuthContext } from '../../contexts/AuthContext';


const socket = io('http://dev.digitro.com', {
  transports: ['websocket', 'polling', 'flashsocket'],
  path: '/callcontrol',
  forceNew: true,
  reconnectionAttempts: 3,
  timeout: 2000
});

function Dashboard() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [calls, setCalls] = useState([])
  const [apiError, setApiError] = useState(false)

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleError = ({ type, message }) => {
    setApiError({ type, message })

    setTimeout(() => setApiError(false), 8000)
  }

  const connect = () => {
    socket.connect();
    socket.emit('USER_CONNECT', {
      username: auth.user.username,
      maxCalls: auth.user.maxCalls,
    });
  }

  const disconnect = () => {
    socket.emit('USER_DISCONNECT', {
      username: 'Teste',
    });
    socket.disconnect();
    auth.signOut(() => navigate('/'));
  }

  useEffect(() => {
    connect();

    socket.on('USER_CONNECTED', (data) => {
      setIsConnected(true);
      console.log(data);
    });

    socket.on('USER_DISCONNECT', (data) => {
      setIsConnected(false);
      console.log(data);
    })

    socket.on('USER_DISCONNECTED', (data) => {
      setIsConnected(false);
      console.log(data)
    })

    socket.on('USER_DISCONNECTION_ERROR', ({ error }) => {
      handleError({ type: 'USER_DISCONNECTION_ERROR', message: error });
    })

    socket.on('NEW_CALL', (data) => {
      console.log(data)
      setCalls((prevState) => [...prevState, data])
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

    socket.on('CALL_ENDED', (data) => {
      console.log(data)
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
      <h1>Teste</h1>
      <h2>{ isConnected ? "Conectado!" : "Desconectado!" }</h2>
      { apiError && (<span>{apiError.type}: {apiError.message}</span>) }
      <ul>
        {calls.map((call) => (
          <li key={call.callId}>{call.caller} - {call.service} - {call.media} - {call.startDate}</li>
        ))}
      </ul>
      <input type="button" name="connect" value="Conectar" onClick={connect} />
      <input type="button" name="disconnect" value="Desconectar" onClick={disconnect} />
    </div>
  );
};

export default Dashboard;
