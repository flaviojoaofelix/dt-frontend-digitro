import { useContext } from 'react';

import { CallsContext } from '../../contexts/CallsContext';

function CallDetails() {
  const { selectedCall, deselectCall } = useContext(CallsContext);

  return(
    <div>
      <h2>Detalhes da Chamada:</h2>
      { selectedCall ? (
        <>
          <span>Call ID: {selectedCall.callId}</span>
          <span>Mídia: {selectedCall.media}</span>
          <span>Data inicial: {selectedCall.startDate}</span>
          <span>Serviço: {selectedCall.service}</span>
          <span>Origem: {selectedCall.caller}</span>
          <input type="button" id="endCall" name="endCall" value="Finalizar" onClick={deselectCall} />
        </>
      ) : (<h3>Nenhuma chamada selecionada</h3>)}
    </div>
  );
}

export default CallDetails;
