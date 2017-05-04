export const calculateDistance = (from, to) => {
  const distanceMatrixService = new window.google.maps.DistanceMatrixService();
  const options = {
    origins: [from],
    destinations: [to],
    travelMode: 'DRIVING',
    unitSystem: window.google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  };

  return new Promise(resolve => {
    distanceMatrixService.getDistanceMatrix(options, (response, status) => {
      if (status !== 'OK') {
        resolve({error: 'An error occured while contacting the Google Maps API: ', status})
      } else {
        const { rows } = response;

        if (rows.length > 0) {
          const { elements } = rows[0];
          const { distance, duration, status } = elements[0];

          if (status === 'ZERO_RESULTS' || status === 'NOT_FOUND') {
            resolve({noResults: true});
          } else {
            resolve({
              travelDistance: distance.text,
              travelDuration: duration.text
            });
          }
        }
      }
    });
  });
};
