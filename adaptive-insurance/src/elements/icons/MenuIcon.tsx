import React from 'react';

type Props = {};

const MenuIcon = (props: Props) => {
  return (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <line x1="4" y1="6" x2="20" y2="6" stroke="black" strokeWidth="2" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2" />
      <line x1="4" y1="18" x2="20" y2="18" stroke="black" strokeWidth="2" />
    </svg>
  );
};

export default MenuIcon;
