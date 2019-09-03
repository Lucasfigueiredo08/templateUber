import React from 'react';
import MapViewDirections from "react-native-maps-directions"


const Directions = ({ destination, origin, onReady}) =>
  (
    <MapViewDirections
      destionation={destination}
      origin={origin}
      onReady={onReady}
      apikey="AIzaSyDYtQWSLvZbvvwnokcIcqiFcOMglnpS9Eg"
      strokeWidth={3}
      strokeColor="hotpink"
    />
  );

export default Directions;
