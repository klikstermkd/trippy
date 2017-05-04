import React from 'react';
import { shallow } from 'enzyme';

import Datalist from './Datalist';

describe('<Datalist />', () => {
  it('renders the component without crashing', () => {
    const props = {
      id: 'test',
      options: [
        {display: 'Bitola'},
        {display: 'Skopje'}
      ]
    };

    shallow(<Datalist {...props} />);
  });

  it('checks that options are properly rendered', () => {
    const props = {
      id: 'test',
      options: [
        {display: 'Bitola'},
        {display: 'Skopje'}
      ]
    };

    const wrapper = shallow(<Datalist {...props} />);
    const options = wrapper.find('option');

    expect(options).toHaveLength(2);
    expect(options.nodes[0].props.value).toBe(props.options[0].display);
    expect(options.nodes[1].props.value).toBe(props.options[1].display);
  });
});
