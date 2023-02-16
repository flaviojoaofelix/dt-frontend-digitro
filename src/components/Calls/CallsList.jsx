import { useContext } from 'react';
import PropTypes from 'prop-types';

import { CallsContext } from '../../contexts/CallsContext';

import CallListCard from './CallListCard';
import Alerts from '../Layout/Alerts';

function CallsList({ alertMessage }) {
  const { calls, selectCall, selectedCall } = useContext(CallsContext);

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
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 className="lead">Aguardando chamadas...</h3>
        </div>
      )}
    </div>
  );
}

CallsList.propTypes = {
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
