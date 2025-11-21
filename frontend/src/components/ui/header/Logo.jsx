import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/img/EA-Lab_Logo_Web.png";
import Image from "../common/Image";

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div
      onClick={handleLogoClick}
      className="cursor-pointer flex items-center"
    >
      <Image
        src={logoImg}
        alt="EA Lab Logo"
        className="h-auto md:h-15 w-auto"
      />
    </div>
  );
};

export default Logo;
