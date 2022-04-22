import React from 'react';
import { getAirportByCode } from '../data';

const Map = ({ airports=[], routes=[], onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick(event.target.getAttribute('code'));
  };

  const airportsDisplay = airports.map(airport => {
    const x = airport.long;
    const y = airport.lat;

    return (
      <g key={airport.code}>
        <circle
          className="general"
          cx={x}
          cy={y}
          code={airport.code}
          onClick={handleClick}
        >
          <title>{airport.name}</title>
        </circle>
      </g>
    );
  });

  const routeDisplay = routes.map(route => {
    const srcAirport = getAirportByCode(route.src);
    const destAirport = getAirportByCode(route.dest);
    const x1 = srcAirport.long;
    const y1 = srcAirport.lat;
    const x2 = destAirport.long;
    const y2 = destAirport.lat;

    return (
      <g key={Object.values(route).join('-')}>
        <circle
          className="source"
          cx={x1}
          cy={y1}
          code={route.src}
          onClick={handleClick}
        >
          <title>{srcAirport.name}</title>
        </circle>
        <circle
          className="destination"
          cx={x2}
          cy={y2}
          code={route.dest}
          onClick={handleClick}
        >
          <title>{destAirport.name}</title>
        </circle>
        <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
      </g>
    );
  });

  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image
          xlinkHref="equirectangular_world.jpg"
          href="equirectangular_world.jpg"
          x="-180"
          y="-90"
          height="100%"
          width="100%"
          transform="scale(1 -1)"
        />
        {airportsDisplay}
        {routeDisplay}
      </g>
    </svg>
  );
};

export default Map;