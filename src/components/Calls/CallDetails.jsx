import { useContext } from 'react';
import PropTypes from 'prop-types';

import { CallsContext } from '../../contexts/CallsContext';

function CallDetails({ endCall }) {
  const { selectedCall, deselectCall } = useContext(CallsContext);

  const handleEndCall = () => {
    endCall(selectedCall.callId);
    deselectCall();
  }

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
          <input type="button" id="endCall" name="endCall" value="Finalizar" onClick={handleEndCall} />
        </>
      ) : (<h3>Nenhuma chamada selecionada</h3>)}
    </div>
  );
}

CallDetails.propTypes = {
  endCall: PropTypes.func.isRequired,
};

export default CallDetails;
