import PropTypes from 'prop-types';

const Sample = ({ text, value, sampleData }) => {
  return <div>{`${text}${value}${sampleData.name}`}</div>;
};

Sample.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  sampleData: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
};

export default Sample;
