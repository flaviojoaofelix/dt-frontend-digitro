import { useContext } from 'react';
import PropTypes from 'prop-types';

import { CallsContext } from '../../contexts/CallsContext';

function CallDetails({ endCall }) {
  const { selectedCall, deselectCall } = useContext(CallsContext);

  const handleEndCall = () => {
    endCall(selectedCall.callId);
    deselectCall();
  };

  return (
    <div>
      <h2 className="display-6 text-center">Detalhes da Chamada</h2>
      <hr />
      {selectedCall ? (
        <>
          <div className="card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-10">
                  <h3 className="fs-4 mb-0 lead">
                    <i className="bi bi-telephone"> </i>
                    Call ID: {selectedCall.callId}
                  </h3>
                </div>
                <div className="col text-end">
                  <button type="button" className="btn-close" aria-label="Close" onClick={deselectCall} />
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-align-start">
                <i className="bi bi-mic"> </i>
                <strong>Mídia:</strong> {selectedCall.media}
              </li>
              <li className="list-group-item">
                <i className="bi bi-calendar-event"> </i>
                <strong>Data inicial:</strong> {selectedCall.startDate}
              </li>
              <li className="list-group-item">
                <i className="bi bi-building"> </i>
                <strong>Serviço:</strong> {selectedCall.service}
              </li>
              <li className="list-group-item">
                <i className="bi bi-person"> </i>
                <strong>Origem:</strong> {selectedCall.caller}
              </li>
            </ul>
            <div className="card-footer text-end">
              <input
                type="button"
                id="endCall"
                name="endCall"
                className="btn btn-primary"
                value="Finalizar"
                onClick={handleEndCall}
              />
            </div>
          </div>
        </>
      ) : (
        <h3 className="lead text-center">Nenhuma chamada selecionada</h3>
      )}
    </div>
  );
}

CallDetails.propTypes = {
  endCall: PropTypes.func.isRequired,
};

export default CallDetails;
