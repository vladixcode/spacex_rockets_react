import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';

const RocketView = ({ viewList, rocketData }) => {
  return (
    <div>
      <div className="go-back" onClick={viewList}>
        <FaArrowLeft /> Back
      </div>
      <div className="shadow rocket-view">
        <div>
          <img
            src={rocketData.flickr_images[0]}
            alt="Rocket"
            className="view-rocket-img"
          />
        </div>

        <div className="rocket-details">
          <p>Name: {rocketData.rocket_name}</p>
          <p>Active: {rocketData.active ? 'true' : 'false'}</p>
          <p>First flight: {rocketData.first_flight}</p>
          <p>Success rate: {rocketData.success_rate_pct}%</p>
        </div>

        <div className="description">
          <p>{rocketData.description}</p>
        </div>
      </div>
    </div>
  );
};

RocketView.propTypes = {
  viewList: PropTypes.func.isRequired,
  rocketData: PropTypes.object.isRequired,
};

export default RocketView;
