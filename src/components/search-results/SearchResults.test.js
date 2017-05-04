import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import SearchResults from './SearchResults';
import store from '../../store';

describe('<SearchResults />', () => {
  it('renders the component without crashing', () => {
    shallow(
      <Provider store={store}>
        <SearchResults />
      </Provider>
    );
  });
});
