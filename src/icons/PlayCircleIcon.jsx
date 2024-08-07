import React from 'react';

export const PlayCircleIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    className="svg-icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height={size || height}
    width={size || width}
    {...props}
  >
    <path
      d="M512 96C282.2 96 96 282.2 96 512s186.2 416 416 416 416-186.2 416-416S741.8 96 512 96z m167.6 423.8l-274.4 166c-5.8 3.6-13.4-0.8-13.4-7.8V346c0-7 7.4-11.4 13.4-7.8l274.4 166c5.8 3.4 5.8 12.2 0 15.6z"
      fill="currentColor"
    />
  </svg>
);
