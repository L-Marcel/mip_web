import L from 'leaflet';
import 'leaflet.awesome-markers'; //Demorou pra eu descobrir como usar isso
import { enumToStringArray, MarkerIcon } from '../../enums';

export default function getIcon(index: number): [L.AwesomeMarkers.Icon, string] {
    let i = enumToStringArray(MarkerIcon)[index];
    let m = i.split(":");

    return [L.AwesomeMarkers.icon({
        icon: m[1],
        markerColor: m[0] as any,
        className: 'awesome-marker awesome-marker-square',
        prefix: 'fa'
    }), m[2]];
};