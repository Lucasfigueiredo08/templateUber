import React, { Component, Fragment } from 'react';
import MapBox, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import Geocoder from 'react-native-geocoding';

import getPixelSize from './../../utils'

import Search from '../Search'
import Directions from '../Directions';

import markerImage from '../../assets/marker.png'
import { LocationBox, LocationText, LocationTimeText, LocationTimeTextSmall, LocationTimeBox } from './styles'

Geocoder.init('AIzaSyDYtQWSLvZbvvwnokcIcqiFcOMglnpS9Eg');

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null
  }

  async componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude }}) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));

        this.setState({
          region: {
            location,
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        })
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    )
  }
                                   // geolocation
  handleLocationSelected = (data, { geometry }) => {
    const { location: { lat: latitude, lng: longitude } } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      },
    })
  }

  render() {
    const {region, destination, duration} = this.state;
    return(
        <View style={{flex: 1}}>
        <MapBox
            style={{flex: 1}}
            region={region}
            showsUserLocation
            loadingEnabled
            ref={el => (this.mapView = el)}
        >
          { destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.setState({ duration: Math.floor(result.duration)})

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(50)
                    }
                  })
                }}
              />
              <Marker  coordinate={destination} anchor={{ x: 0, y: 0  }} image={markerImage}>
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker  coordinate={region} anchor={{ x: 0, y: 0  }}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>31</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapBox>

        <Search onLocationSelected={this.handleLocationSelected} />
        </View>
    )
  }
}

