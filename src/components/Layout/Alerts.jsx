import PropTypes from 'prop-types';

function Alerts({ alertMessage }) {
  const { type, title, message } = alertMessage;

  return (
    <div className={`alert alert-${type} text-center`} role="alert">
      <span className="visually-hidden">{title}</span>
      {message}
    </div>
  );
}

Alerts.propTypes = {
  alertMessage: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default Alerts;
