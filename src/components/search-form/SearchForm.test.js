import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import SearchForm from './SearchForm';
import store from '../../store';

describe('<SearchForm />', () => {
  it('renders the component without crashing', () => {
    shallow(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );
  });
});
