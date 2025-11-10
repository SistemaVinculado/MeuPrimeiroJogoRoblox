import React from 'react';

interface MenuButtonProps {
  label: string;
  onClick?: () => void;
  primary?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ label, onClick, primary = false }) => {
  const typeClass = primary ? 'menu-button-primary' : 'menu-button-secondary';

  return (
    <button
      onClick={onClick}
      className={`menu-button-base ${typeClass}`}
    >
      {label}
    </button>
  );
};

export default MenuButton;
