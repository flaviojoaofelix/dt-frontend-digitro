import PropTypes from 'prop-types';

function CallListCard({ call, selectCall, selectedCall }) {
  return (
    <button
      className={`card mb-2 w-100 border ${
        selectedCall && selectedCall.callId == call.callId ? 'border-primary' : 'border-primary-subtle'
      }`}
      onClick={() => selectCall(call.callId)}
    >
      <div className="card-body p-0">
        <div className="d-flex justify-content-between p-md-1">
          <div className="d-flex flex-row">
            <div className="bg-primary align-self-center align-items-center h-100 me-2 rounded-2">
              <i
                className={`bi bi-chat-dots-fill fs-1 mx-4 ${
                  selectedCall && selectedCall.callId == call.callId ? 'text-light' : 'text-black-50'
                }`}
              ></i>
            </div>
            <div>
              <h4 className="text-start">{call.caller}</h4>
              <p className="lead mb-0 text-start">{call.service}</p>
            </div>
          </div>
          <div className="align-self-center">
            <h2 className="fs-6 mb-0 text-muted">13m40s</h2>
          </div>
        </div>
      </div>
    </button>
  );
}

CallListCard.propTypes = {
  call: PropTypes.PropTypes.shape({
    callId: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    caller: PropTypes.string.isRequired,
  }).isRequired,
  selectCall: PropTypes.func.isRequired,
  selectedCall: PropTypes.PropTypes.shape({
    callId: PropTypes.string.isRequired,
    media: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    caller: PropTypes.string.isRequired,
  }),
};

export default CallListCard;
