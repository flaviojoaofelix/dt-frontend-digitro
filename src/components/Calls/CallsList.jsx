import { useContext } from 'react';

import { CallsContext } from '../../contexts/CallsContext';

function CallsList() {
  const { calls, selectCall } = useContext(CallsContext);

  return (
    <div>
      { calls.length ? calls.map((call) => (
        <button
          key={call.callId}
          onClick={() => selectCall(call.callId)}
        >
            <span >{call.caller}</span>
            <span>{call.service}</span>
            <span>{call.startDate}</span>
        </button>
      )) : (<h3>Nenhuma chamada</h3>) }
    </div>
  );
}

export default CallsList