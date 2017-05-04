import React from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../action-creators';
import * as actionTypes from '../../action-types';
import Datalist from '../datalist/Datalist';
import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.onLocationChange = this.onLocationChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onLocationChange(type) {
    return event => {
      const location = event.target.value;

      this.props.onLocationChange({type, location});

      if (location) {
        this.props.findLocations({type: `${type}_LOCATIONS`, query: location});
      } else {
        this.props.setLocations({type: `${type}_LOCATIONS`, locations: []});
      }
    };
  }

  onFormSubmit(event) {
    event.preventDefault();

    const { from, to } = this.props;

    if (from && to) {
      this.props.setFormSubmit(true);
      this.props.history.push(`/search?from=${from}&to=${to}`);
    }
  }

  render() {
    return (
      <div>
        <form id="form" onSubmit={this.onFormSubmit}>
          <ul className="flex-outer">
            <li>
              <label htmlFor="from">From:</label>
              <input
                type="text"
                name="from"
                id="from"
                value={this.props.from}
                onChange={this.onLocationChange(actionTypes.FROM)}
                list="fromLocations"
                required="required"
                placeholder="Enter start location" />
              <Datalist id="fromLocations" options={this.props.fromLocations} />
            </li>
            <li>
              <label htmlFor="to">To:</label>
              <input
                type="text"
                name="to"
                id="to"
                value={this.props.to}
                onChange={this.onLocationChange(actionTypes.TO)}
                list="toLocations"
                required="required"
                placeholder="Enter end location" />
              <Datalist id="toLocations" options={this.props.toLocations} />
            </li>
            <li>
              <button type="submit">Search</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  fromLocations: PropTypes.arrayOf(PropTypes.object).isRequired,
  toLocations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLocationChange: PropTypes.func.isRequired,
  findLocations: PropTypes.func.isRequired,
  setLocations: PropTypes.func.isRequired,
  setFormSubmit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  from: state.from,
  to: state.to,
  fromLocations: state.fromLocations,
  toLocations: state.toLocations
});

const mapDispatchToProps = dispatch => ({
  onLocationChange: data => dispatch(actions.onLocationChange(data)),
  findLocations: debounce(data => dispatch(actions.findLocations(data)), 300),
  setLocations: data => dispatch(actions.setLocations(data)),
  setFormSubmit: data => dispatch({type: actionTypes.FORM_SUBMIT, data})
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
