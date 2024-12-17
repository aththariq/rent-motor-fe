import React from "react";
import logo from "@/assets/logo.svg"; 

const NavbarLogin = () => {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogin;
