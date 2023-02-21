import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { API } from "../config/api";

import Rect from "../assets/Rectangle.svg";
import PP from "../assets/PP.png";
import Logo from "../assets/Logo.svg";

export default function Profile() {
  const userID = JSON.parse(localStorage.getItem("user"));

  const { data: user } = useQuery("useProfile", async () => {
    const response = await API.get(`/user/$(userID.id)`);
    return response.data.data;
  });

  const post = user?.post.map((item) => {
    return item;
  });

  return (
    <div className="w-screen h-screen">
      <Navbar />

      <div className="relative w-full overflow-hidden">
        <div className="absolute right-16 top-0 z-10">
          <img src={Rect} alt="rectangle" className="h-[35rem]" />
        </div>

        <div className="w-full pt-16 md:max-w-screen-md lg:max-w-screen-lg mx-auto">
          <div className="flex justify-between items-start gap-3">
            <div className="flex flex-col w-full items-start">
              <Avatar img={PP} rounded size={"lg"} />
              <h1 className="text-xl font-bold py-4">{user?.fullname}</h1>
              <h3 className="text-3xl font-extrabold w-[90%]">
                {user?.greeting}
              </h3>
              <Link>
                <button className="mt-12 py-2 px-5 text-white bg-[#2FC4B2] rounded text-sm font-bold">
                  Edit Profile
                </button>
              </Link>
            </div>
            <div>
              <div> {/*masih geser nggak? */}
                <img src={user?.art} alt="art" className="w-[640px]" />
              </div>
            </div>
          </div>

          <div className="py-16">
            <h3 className="text-xl font-extrabold">My Works</h3>
            <div className="grid grid-cols-3 items-center gap-4 pt-6">
              {post?.map((item) => {
                return item.images
                  ?.map((item) => {
                    return <img src={item.image} alt="art" key={item.id} />;
                  })
                  .shift();
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
