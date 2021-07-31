import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import getIcon from '../../assets/icons';

export default function Map(props: MapProps) {
  const [c, setC] = useState(0);
 const position = { lat: -5.1133, lng: -36.6348 };
  let icon = getIcon(c);
  return (
    (props.ph || 0) > 0 &&
    (props.mh || 0) > 0 &&
    (props.ph || 0) === props.dimensions.h ?
    <MapContainer id="map"
      style={{ width: '100vw', height: (props.ph || 0) - (props.mh || 0) }}
      center={position}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={icon[0]} position={position}>
        <Popup>
          {icon[1]}
        </Popup>
      </Marker>

    </MapContainer> : null
  );
};