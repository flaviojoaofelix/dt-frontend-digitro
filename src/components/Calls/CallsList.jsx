import { useContext } from 'react';

import { CallsContext } from '../../contexts/CallsContext';

import CallListCard from './CallListCard';

function CallsList() {
  const { calls, selectCall, selectedCall } = useContext(CallsContext);

  return (
    <div>
      <h2 className="display-6">Atendimentos</h2>
      <hr />
      {calls.length ? (
        calls.map((call) => (
          <CallListCard key={call.callId} call={call} selectCall={selectCall} selectedCall={selectedCall} />
        ))
      ) : (
        <>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 className="lead">Aguardando chamadas...</h3>
        </>
      )}
    </div>
  );
}

export default CallsList;
