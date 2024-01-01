import { MapMarker } from "expo-leaflet";

let svgIcon = `
<svg fill="#8F9192" height="32px" width="32px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
viewBox="0 0 297 297" xml:space="preserve">
<path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645
c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645
C259.253,49.703,209.57,0,148.5,0z M148.5,79.693c16.964,0,30.765,13.953,30.765,31.104c0,17.151-13.801,31.104-30.765,31.104
c-16.964,0-30.765-13.953-30.765-31.104C117.735,93.646,131.536,79.693,148.5,79.693z"/>
</svg>
  `;

export const mapMarkers: MapMarker[] = [
  {
    id: "1",
    position: { lat: 35.73323, lng: 10.575468 },
    icon: svgIcon,
    size: [32, 32],
  },
  {
    id: "2",
    position: { lat: 35.834166, lng: 10.591175 },
    icon: svgIcon,
    size: [32, 32],
  },
  {
    id: "3",
    position: { lat: 35.774205, lng: 10.833542 },
    icon: svgIcon,
    size: [32, 32],
  },
];

export const locationsInfo = [
  {
    id: "1",
    name: "Msaken Agency",
    PhoneNumber: "73200150",
  },
  {
    id: "2",
    name: "Sahloul Agency",
    PhoneNumber: "73550170",
  },
  {
    id: "3",
    name: "Mounastir Agency",
    PhoneNumber: "73202010",
  },
];
