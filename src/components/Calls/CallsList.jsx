import PropTypes from 'prop-types';

function CallsList({ calls }) {
  return (
    <ul>
      { calls.length ? calls.map((call) => (
        <li key={call.callId}>
          <span>{call.caller}</span>
          <span>{call.service}</span>
          <span>{call.startDate}</span>
        </li>
      )) : (<li>Nenhuma chamada</li>) }
    </ul>
  );
}

CallsList.propTypes = {
  calls: PropTypes.arrayOf(PropTypes.shape({
    callId: PropTypes.string.isRequired,
    media: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    caller: PropTypes.string.isRequired,
  })).isRequired,
};

export default CallsList