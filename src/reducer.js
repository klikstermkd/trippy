import * as actionTypes from './action-types';

const initialState = {
  from: '',
  to: '',
  fromLocations: [],
  toLocations: [],
  formSubmit: false,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FROM:
      return {...state, from: action.location};
    case actionTypes.TO:
      return {...state, to: action.location};
    case actionTypes.FROM_LOCATIONS:
      return {...state, fromLocations: action.locations};
    case actionTypes.TO_LOCATIONS:
      return {...state, toLocations: action.locations};
    case actionTypes.FORM_SUBMIT:
    console.log('form formSubmit', action.data);
      return {...state, formSubmit: action.data};
    case actionTypes.SHOW_LOADING:
      return {...state, isLoading: action.data};
    default:
      return state;
  }
};
