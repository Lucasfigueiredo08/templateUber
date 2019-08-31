import React, { Component } from 'react';
import MapBox from 'react-native-maps';
import { View } from 'react-native';

import Search from '../Search/index'

export default class Map extends Component {
  state = {
    region: null
  }

  async componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude }}) => {
        this.setState({
          region: {
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

  render() {
    const {region} = this.state;
    return(
        <View style={{flex: 1}}>
        <MapBox
            style={{flex: 1}}
            region={region}
            showsUserLocation
            loadingEnabled
        />
        <Search />
        </View>
    )
  }
}

