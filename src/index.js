import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import SearchForm from './components/search-form/SearchForm';
import SearchResults from './components/search-results/SearchResults';
import store from './store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="container">
        <Route path="/" component={SearchForm} />
        <Route path="/search" component={SearchResults} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
