import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchRocket = ({ onSearch, searchTerm }) => {
  return (
    <div className="search-rocket shadow" data-testid="search-rocket-div-id">
      <input
        type="text"
        placeholder="Search by Rocket name"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <i className="icon-search">
        <FaSearch size={25} />
      </i>
    </div>
  );
};

SearchRocket.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

export default SearchRocket;
