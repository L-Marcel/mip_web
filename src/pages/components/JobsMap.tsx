import React, { useMemo } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { LeafletEventHandlerFnMap } from "leaflet";
import getIcon, { getIconIndex } from '../../assets/icons';
import 'leaflet.awesome-markers'; 

export default function JobsMap(props: JobRegisterMapProps) {
  const iconIndex = getIconIndex(props.job.icon) as number;
  const icon = getIcon(iconIndex);

  const eventHandlers = useMemo<LeafletEventHandlerFnMap>(() => ({
    dragend(e) {
      props.onChangeLatLng(e.target._latlng);
    },
  }), [props]);

  return (
    (props.ph || 0) > 0 &&
      (props.mh || 0) > 0 &&
      (props.ph || 0) === props.dimensions.h ?
      <MapContainer id="map"
        style={{ width: '100vw', height: (props.ph || 0) - 150 - (props.mh || 0) }}
        center={{ lat: -5.1133, lng: -36.6348 }}
        zoom={15}
        doubleClickZoom={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { icon[0] && <Marker
          position={{ ...props.job }}
          icon={icon[0]}
          eventHandlers={eventHandlers}
          draggable
        >
        </Marker> }
      </MapContainer> : null
  );
};