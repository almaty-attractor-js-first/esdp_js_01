import React, {Component} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import Pin from './pin';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2dndW4iLCJhIjoiY2p5dHhiZ2wzMDg5YTNocDR4bjFteGg5aSJ9.7i8qXJyIkAxGmpoiGnpxIA';

class ReactMapGl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 43.238949,
        longitude: 76.889709,
        zoom: 12,
        bearing: 0,
        pitch: 0
      }
    };
  }

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="30vh"
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={v => this.setState({viewport: v})}
        preventStyleDiffing={false}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Marker latitude={43.23} longitude={76.88} offsetLeft={-20} offsetTop={-10}>
          <div style={{color: 'gray'}}>Адрес 1</div>
          <Pin size={20} />
        </Marker>
        <Marker latitude={43.25} longitude={76.91} offsetLeft={-20} offsetTop={-10}>
          <div style={{color: 'gray'}}>Адрес 2</div>
          <Pin size={20} />
        </Marker>
        <Marker latitude={43.25} longitude={76.85} offsetLeft={-20} offsetTop={-10}>
          <div style={{color: 'gray'}}>Адрес 3</div>
          <Pin size={20} />
        </Marker>
      </MapGL>
    );
  }
}
export default ReactMapGl;
