import React from 'react';

export const RepeatInactiveIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    version="1.1"
    id="Icons"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    height={size || height}
    width={size || width}
    {...props}
  >
    <style type="text/css">
    {`
        .st0 { fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; stroke-miterlimit: 10; }
        .st1 { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; }
      `}
    </style>
    <polygon className="st1" points="18,6.6 18,11.4 21,9 " />
    <path className="st1" d="M23.8,12.1c0.8,1.1,1.2,2.5,1.2,3.9v0c0,3.9-3.1,7-7,7h-4c-3.9,0-7-3.1-7-7v0c0-3.9,3.1-7,7-7h4" />
  </svg>
);
