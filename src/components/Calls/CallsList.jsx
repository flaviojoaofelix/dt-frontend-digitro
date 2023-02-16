import { useContext } from 'react';
import PropTypes from 'prop-types';

import { CallsContext } from '../../contexts/CallsContext';
import { AuthContext } from '../../contexts/AuthContext';

import CallListCard from './CallListCard';
import Alerts from '../Layout/Alerts';

function CallsList({ isConnected, alertMessage }) {
  const { calls, selectCall, selectedCall } = useContext(CallsContext);
  const auth = useContext(AuthContext);

  return (
    <div>
      <h2 className="display-6 text-center">Atendimentos</h2>
      <hr />
      {alertMessage && <Alerts alertMessage={alertMessage} />}
      {calls.length ? (
        calls.map((call) => (
          <CallListCard key={call.callId} call={call} selectCall={selectCall} selectedCall={selectedCall} />
        ))
      ) : (
        <div className="text-center">
          {isConnected ? (
            <>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h3 className="lead">Aguardando chamadas...</h3>
            </>
          ) : (
            <h3 className="lead">Você está desconectado.</h3>
          )}
        </div>
      )}
      <p className="text-center mb-0">
        Número Máximo de Chamadas: <span className="badge text-bg-info">{auth.user.maxCalls}</span>
      </p>
    </div>
  );
}

CallsList.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  alertMessage: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.string,
      title: PropTypes.string,
      message: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
};

CallsList.defaultProps = {
  apiError: false,
};

export default CallsList;
