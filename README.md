# How to use Google Maps and React

> For simple usage only

These examples use [react-google-maps](https://tomchentw.github.io/react-google-maps/) but only cover two simple but common use cases.

## Installation

`yarn add recompose react-google-maps`

or

`npm install recompose react-google-maps`

You will then need to copy the [`src/GoogleMap.js`](src/GoogleMap.js) file in this repository.

## Display a map

⚠️ **Note that the map must be inside a HTML element with a set width and height** ⚠️

```javascript
import { MapCreator } from "./GoogleMap";

const Map = MapCreator(process.env.REACT_APP_GOOGLE_MAP_KEY);

const map =
  <Map
    defaultZoom={8}
    defaultCenter={{ lat: 48.861101016139216, lng: 2.34832763671875 }}
  />
```

`MapCreator` is a function which, given a [Google Map API key](https://developers.google.com/maps/documentation/javascript/), will return a `Map` component.
`defaultZoom` can be 1 to 12, 1 being the furthest away from earth.
`defaultCenter` is an object with a lattitude and a longitude to center the map.

## Display a map with markers

⚠️ **Note that the map must be inside a HTML element with a set width and height** ⚠️


```javascript
import { Marker } from "react-google-maps";
import { MapCreator } from "./GoogleMap";

const Map = MapCreator(process.env.REACT_APP_GOOGLE_MAP_KEY);

const map =
  <Map
    defaultZoom={8}
    defaultCenter={{ lat: 48.861101016139216, lng: 2.34832763671875 }}
  >
    <Marker position={{ lat: 48.861101016139216, lng: 2.34832763671875 }} />
  </Map>
```

Here we use a component from `react-google-maps`, `Marker` which needs a `position` props with a lattitude and a longitude.
You can add as much markers as you want.


## Display a map and get coordinates on click

⚠️ **Note that the map must be inside a HTML element with a set width and height** ⚠️

```javascript
import { MapCreator } from "./GoogleMap";

const Map = MapCreator(process.env.REACT_APP_GOOGLE_MAP_KEY);

const map =
  <Map
    defaultZoom={8}
    defaultCenter={{ lat: 48.861101016139216, lng: 2.34832763671875 }}
    onClick={(event) => {
      console.log(event.latLng.lat(), event.latLng.lng());
    }}
  />
```

## Search for an address

```javascript
import { PlacesSearchCreator } from "./GoogleMap";

const PlacesSearch = PlacesSearchCreator(process.env.REACT_APP_GOOGLE_MAP_KEY);

const searchInput =
  <PlacesSearch
    placeholder="Search for an address"
    onLocationChange={(location) => console.log(location)}
  />
```

As for the map, you should use a [Google Map API key](https://developers.google.com/maps/documentation/javascript/).

`onLocationChange` will be called when an address is chosen, either by the keyboard or by the mouse.
If an invalid address is entered, `location` will be `null`.

Note that you could also change the style of the input by using a `style` prop.
