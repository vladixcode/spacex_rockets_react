import React from 'react';
import PropTypes from 'prop-types';
import { FaCircle } from 'react-icons/fa';

const RocketItem = ({ id, name, desc, img, status, getRocket }) => {
  return (
    <div onClick={() => getRocket(id)} className="rocket-item shadow">
      <img className="img-rocket" src={img} alt="Rocket" />
      <div>
        <h3>{name}</h3>
        <p className="list-description">{desc}</p>
      </div>
      <div>
        <FaCircle size={15} style={{ color: status ? 'lightgreen' : 'red' }} />
      </div>
    </div>
  );
};

RocketItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  img: PropTypes.array.isRequired,
  status: PropTypes.bool.isRequired,
  getRocket: PropTypes.func.isRequired,
};

export default RocketItem;
