import fetch from 'isomorphic-fetch';

export const findLocations = ({type, query}) => dispatch => {
  const url = `https://api.mozio.com/v2/locations/query/?api_key=c09cc3d01bbe22cb5d7afab4f82c8f3f&lang=en-us&query=${query}`;

  const headers = {
    'api-key': 'c09cc3d01bbe22cb5d7afab4f82c8f3f'
  };

  return fetch(url, {headers})
          .then(response => response.json())
          .then(data => dispatch({type, locations: data.results}));
};

export const onLocationChange = ({type, location}) => ({type, location});
export const setLocations = ({type, locations}) => ({type, locations});
