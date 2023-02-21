import React from "react";
import { useState } from "react";

import Logo from "../assets/Logo.svg";
import Illustration from "../assets/LandingIllustration.svg";
import BorderTopL from "../assets/TopLeftBorder.svg";
import BorderBottomL from "../assets/BottomLeftBorder.svg";
import BorderBottomR from "../assets/BottomRightBorder.svg";

import Register from "../components/Register";
import Login from "../components/Login";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 left-0 w-28 md:w-64">
          <img src={BorderTopL} alt="" />
        </div>

        <div className="absolute bottom-0 left-0 w-28 md:w-64">
          <img src={BorderBottomL} alt="" />
        </div>

        <div className="absolute bottom-0 right-0 w-28 md:w-64">
          <img src={BorderBottomR} alt="" />
        </div>

        <div className="relative p-6 pt-16 pb-16 md:pb-6 md:pt-6">
          <div className="w-full h-full mx-auto flex flex-col justify-between items-center gap-20 lg:max-w-screen-lg lg:flex-row lg:h-screen xl:max-w-screen-xl">
            <div className="w-full flex flex-col justify-center items-start">
              <img src={Logo} alt="logo" className="w-40 lg:w-64" />
              <h3 className="text-3xl font-extrabold mt-4 leading-5 lg:">
                show your work to inspire everyone
              </h3>
              <p className="text-xl mt-2 text-gray-600">
                Ways Exhibition is a website design creators gather to share
                their work with other creators
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  className="px-4 py-1.5 rounded-md text-white font-extrabold bg-[#2FC4B2] text-lg lg:text-xl"
                  onClick={handleShowRegister}
                >
                  Join Now
                </button>
                <button
                  className="px-4 py-1.5 rounded-md text-slate-800 font-extrabold bg-[#E7E7E7] text-lg lg:text-xl"
                  onClick={handleShowLogin}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <img src={Illustration} alt="" className="w-[80rem]" />
            </div>
          </div>
        </div>

        <Register show={showRegister} handlClose={handleCloseRegister} />
        <Login show={showLogin} handleClose={handleCloseLogin} />
      </div>
    </>
  );
}
