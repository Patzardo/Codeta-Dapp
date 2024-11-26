import PropTypes from 'prop-types';

const Card = ({ title, value, icon, color }) => {
  return (
    <div className={`rounded-lg p-10 shadow-md ${color}`} style={{ boxShadow: 'rgb(38, 57, 77) 0px 17px 20px -10px' }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
};

export default Card;