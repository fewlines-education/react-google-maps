import React from "react";
import { compose, lifecycle, withProps, withStateHandlers } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";
const {
  StandaloneSearchBox
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const MapCreator = key =>
  compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withStateHandlers(
      () => ({
        isOpen: false
      }),
      {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen
        })
      }
    ),
    withScriptjs,
    withGoogleMap
  )(props => {
    const { children } = props;
    return <GoogleMap {...props}>{children}</GoogleMap>;
  });

const PlacesSearchCreator = key =>
  compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />
    }),
    lifecycle({
      componentWillMount() {
        const refs = {};

        this.setState({
          places: [],
          onSearchBoxMounted: ref => {
            refs.searchBox = ref;
          },
          onPlacesChanged: callback => {
            const places = refs.searchBox.getPlaces();

            if (callback && places.length >= 1) {
              callback(places[0]);
            } else if (callback) {
              callback(null);
            }
          }
        });
      }
    }),
    withScriptjs
  )(props => (
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={() => props.onPlacesChanged(props.onLocationChange)}
      >
        <input
          type="text"
          placeholder={props.placeholder || "Customized your placeholder"}
          style={props.style || {
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </StandaloneSearchBox>
      <ol>
        {props.places.map(
          ({ place_id, formatted_address, geometry: { location } }) => (
            <li key={place_id}>
              {formatted_address}
              {" at "}
              ({location.lat()}, {location.lng()})
            </li>
          )
        )}
      </ol>
    </div>
  ));

export { MapCreator, PlacesSearchCreator };
