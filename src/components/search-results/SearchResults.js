import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { calculateDistance } from '../../services';
import * as actionTypes from '../../action-types';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: '',
      travelDuration: '',
      travelDistance: '',
      noResults: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.formSubmit) {
      this.performSearch();

      this.props.setFormSubmit(false);
    }
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch() {
    const { from, to } = queryString.parse(this.props.location.search);

    this.props.onLocationChange({type: actionTypes.FROM, location: from});
    this.props.onLocationChange({type: actionTypes.TO, location: to});

    if (from && to) {
      this.setState({from, to, noResults: false});
      this.props.showLoading(true);

      calculateDistance(from, to)
        .then(data => {
          this.setState(data);

          this.props.showLoading(false);
        });
    } else {
      this.setState({noResults: true});
    }
  }

  render() {
    const results = (
      <div>
        <h3>Your trip:</h3>
        <p>From: {this.state.from}</p>
        <p>To: {this.state.to}</p>
        <p>Travel mode: Driving</p>
        <p>Distance: {this.state.travelDistance}</p>
        <p>Duration: {this.state.travelDuration}</p>
      </div>
    );

    return (
      <div className="flex-outer" style={{marginTop: '50px'}}>
        {this.props.isLoading ? <div style={{textAlign: 'center'}}>Loading...</div> :
          <div style={{textAlign: this.state.noResults ? 'center' : 'initial'}}>
            {this.state.noResults ? <span>No results found.</span> : results}
          </div>}
      </div>
    );
  }
}

SearchResults.propTypes = {
  formSubmit: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLocationChange: PropTypes.func.isRequired,
  showLoading: PropTypes.func.isRequired,
  setFormSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formSubmit: state.formSubmit,
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  onLocationChange: data => dispatch(data),
  setFormSubmit: data => dispatch({type: actionTypes.FORM_SUBMIT, data}),
  showLoading: data => dispatch({type: actionTypes.SHOW_LOADING, data})
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
