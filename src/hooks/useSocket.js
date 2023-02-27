import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

import { CallsContext } from '../contexts/CallsContext';

import socketUserOptions from '../data/Config/socket.config.json';

const socketInstance = io(socketUserOptions.baseURL, socketUserOptions.params);

const useSocket = () => {
  const [socket, setSocket] = useState(socketInstance);
  const [socketAlerts, setSocketAlerts] = useState(false);

  const { addCall, removeCall, deselectCall, cleanCalls } = useContext(CallsContext);

  const socketConnect = (username, maxCalls) => {
    socket.connect();

    socket.emit('USER_CONNECT', {
      username,
      maxCalls,
    });
  };

  const socketDisconnect = (username) => {
    handleAlerts({
      type: 'warning',
      title: 'USER_DISCONNECT',
      message: 'Desconectando...',
      duration: 3000,
    });

    socket.emit('USER_DISCONNECT', {
      username: username,
    });

    deselectCall();
    cleanCalls();

    socket.disconnect();
  };

  const socketEndCall = (callId) => {
    socket.emit('END_CALL', {
      callId,
    });
  };

  const handleAlerts = ({ type, title, message, duration }) => {
    setSocketAlerts({ type, title, message });
    setTimeout(() => setSocketAlerts(false), duration);
  };

  useEffect(() => {
    socket.on('USER_CONNECTED', () => {
      handleAlerts({
        type: 'success',
        title: 'USER_CONNECTED',
        message: 'Conectado!',
        duration: 3000,
      });
    });

    socket.on('USER_CONNECTION_ERROR', ({ error }) => {
      handleAlerts({
        type: 'danger',
        title: 'USER_CONNECTION_ERROR',
        message: error,
        duration: 6000,
      });
    });

    socket.on('USER_DISCONNECTED', () => {
      socket.disconnect();

      handleAlerts({
        type: 'success',
        title: 'USER_DISCONNECTED',
        message: 'Desconectado!',
        duration: 3000,
      });
    });

    socket.on('USER_DISCONNECTION_ERROR', ({ error }) => {
      handleAlerts({
        type: 'danger',
        title: 'USER_DISCONNECTION_ERROR',
        message: error,
        duration: 6000,
      });
    });

    socket.on('NEW_CALL', (data) => {
      addCall(data);
      socket.emit('NEW_CALL_ANSWERED', {
        callId: data.callId,
      });
    });

    socket.on('NEW_CALL_ANSWERED', (data) => {
      console.log(data);
    });

    socket.on('NEW_CALL_ERROR', ({ error }) => {
      handleAlerts({
        type: 'danger',
        title: 'NEW_CALL_ERROR',
        message: error,
        duration: 6000,
      });
    });

    socket.on('END_CALL', () => {
      handleAlerts({
        type: 'warning',
        title: 'END_CALL',
        message: 'Finalizando chamada...',
        duration: 3000,
      });
    });

    socket.on('CALL_ENDED', ({ callId }) => {
      removeCall(callId);

      handleAlerts({
        type: 'success',
        title: 'CALL_ENDED',
        message: 'Chamada finalizada!',
        duration: 3000,
      });
    });

    socket.on('END_CALL_ERROR', ({ error }) => {
      handleAlerts({
        type: 'danger',
        title: 'END_CALL_ERROR',
        message: error,
        duration: 6000,
      });
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

  return { socket, socketAlerts, socketConnect, socketDisconnect, socketEndCall };
};

export default useSocket;
