import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const CallsContext = createContext(null);

function CallsProvider({ children }) {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);

  const addCall = (call) => {
    setCalls((prevState) => [...prevState, call]);
  };

  const removeCall = (callId) => {
    setCalls((prevState) => prevState.filter((call) => call.callId !== callId));
  };

  const cleanCalls = () => {
    setCalls([]);
  }

  const selectCall = (callId) => {
    setSelectedCall(calls.find((call) => call.callId === callId));
  };

  const deselectCall = () => {
    setSelectedCall(null);
  };

  const contextValue = useMemo(() => ({
    calls,
    selectedCall,
    addCall,
    removeCall,
    cleanCalls,
    selectCall,
    deselectCall,
  }), [calls, selectedCall]);

  return(
    <CallsContext.Provider value={ contextValue }>
      {children}
    </CallsContext.Provider>
  );
}

CallsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CallsContext, CallsProvider };
