import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Marker } from "react-google-maps";
import { MapCreator, PlacesSearchCreator } from "./GoogleMap";

const Map = MapCreator(process.env.REACT_APP_GOOGLE_MAP_KEY);
const PlacesSearch = PlacesSearchCreator(process.env.REACT_APP_GOOGLE_MAP_KEY);

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlacesSearch onLocationChange={console.log} />
        <div style={{width: "400px", height: "400px"}}>
          <Map
            defaultZoom={8}
            defaultCenter={{ lat: 48.861101016139216, lng: 2.34832763671875 }}
            onClick={(event) => {
              console.log(event.latLng.lat(), event.latLng.lng())
            }}
          >
            <Marker position={{ lat: 48.861101016139216, lng: 2.34832763671875 }} />
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
