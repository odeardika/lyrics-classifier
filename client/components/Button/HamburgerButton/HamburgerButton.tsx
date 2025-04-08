"use client";
import React from "react";
import "./HamburgerButton.css";

interface HamburgerButtonProps {
  onClick: () => void;
}
const HamburgerButton = ({onClick} : HamburgerButtonProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const handleOnClick = () => {
    setIsActive(!isActive);
    onClick();
  };
  return (
    <button
      id={isActive ? "hamburger-active" : "hamburger"}
      name="hamburger"
      type="button"
      className=" right-4 md:hidden "
      onClick={handleOnClick}
    >
      <span className="hamburger-line origin-bottom-left"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line origin-bottom-left"></span>
    </button>
  );
};

export default HamburgerButton;