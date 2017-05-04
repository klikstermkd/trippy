import React from 'react';
import {v4 as uuidV4} from 'uuid';
import PropTypes from 'prop-types';

const Datalist = ({id, options}) => (
  <datalist id={id}>
    {options.map(location => (
      <option value={location.display} key={uuidV4()}></option>
    ))}
  </datalist>
);

Datalist.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Datalist;
