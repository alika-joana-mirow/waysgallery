import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { Avatar, Dropdown } from "flowbite-react";

import Logo from "../assets/Logo.svg";
import Profile from "../assets/Profile.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import OrderIcon from "../assets/OrderIcon.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [_, dispatch] = useContext(UserContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="py-4 px-6 border-b border-slate-200">
      <div className="w-full lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/home">
            <img src={Logo} alt="logo" className="w-[6rem]" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={"/upload-post"}
            className="px-6 py-2 bg-[#2FC4B2] rounded-lg text-white font-semibold text-lg"
          >
            Upload
          </Link>
          <Dropdown
            label={<Avatar alt="User setting" img={Profile} rounded={true} />}
            arrowIcon={false}
            inline={true}
          >
            <Dropdown.Item>
              <img src={ProfileIcon} alt="icon" className="px-2 w-[3rem]" />
              <Link to={"/profile"} className="font-semibold text-lg"> Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item className="border-b border-slate-400 py-4">
              <img src={OrderIcon} alt="icon" className="px-2 w-[3rem]" />
              <Link to={"/order"} className="font-semibold text-lg">Order</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <img src={LogoutIcon} alt="icon" className="px-2 w-[3rem] ml-1" />
              <button onClick={logout} className="text-red-500 font-semibold text-lg">
                Logout
              </button>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
