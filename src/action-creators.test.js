import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './action-creators';
import * as actionTypes from './action-types';
import nock from 'nock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create an action to change input text', () => {
    const location = 'bitola';
    let expectedAction = {
      type: actionTypes.FROM,
      location
    };

    expect(actions.onLocationChange(expectedAction)).toEqual(expectedAction);

    expectedAction.type = actionTypes.TO

    expect(actions.onLocationChange(expectedAction)).toEqual(expectedAction)
  });

  it('should create an action to set autocomplete locations in store', () => {
    const location = 'bitola';
    const expectedAction = {
      type: actionTypes.FROM_LOCATIONS,
      locations: [{display: 'bitola'}, {display: 'skopje'}]
    };

    expect(actions.setLocations(expectedAction)).toEqual(expectedAction)
  });
});

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('finds locations on autocomplete', () => {
    nock('https://api.mozio.com')
      .get('/v2/locations/query/?api_key=c09cc3d01bbe22cb5d7afab4f82c8f3f&lang=en-us&query=bitola')
      .reply(200, {results: [{display: 'bitola'}]});

    const expectedActions = [
      {
        type: actionTypes.FROM_LOCATIONS,
        locations: [{display: 'bitola'}]
      }
    ];
    const store = mockStore({});

    return store.dispatch(actions.findLocations({type: actionTypes.FROM_LOCATIONS, query: 'bitola'}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});
