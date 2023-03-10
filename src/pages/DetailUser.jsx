import React from "react";
import Navbar from "../components/Navbar";
import { Avatar } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../config/api";

// icon & image
import Rect from "../assets/Rectangle.svg";
import PP from "../assets/PP.png";
import { useParams } from "react-router-dom";

export default function DetailUser() {
  const { id } = useParams();
  const { data: user } = useQuery("userDetail", async () => {
    const response = await API.get(`/user/${id}`);
    return response.data.data;
  });

  const post = user?.post.map((item) => {
    return item;
  });

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="relative w-full overflow-hidden">
        <div className="absolute -right-16 top-0 -z-10">
          <img src={Rect} alt="rectangle" className=" h-[400px]" />
        </div>
        <div className="w-full pt-16 md:max-w-screen-md lg:max-w-screen-lg mx-auto ">
          <div className="flex justify-between items-start gap-3">
            <div className="w-full flex flex-col items-start">
              <Avatar img={PP} rounded={true} size="lg" />
              <h3 className="py-4 font-medium text-xl">{user?.full_name}</h3>
              <h1 className="text-5xl w-[70%] font-semibold ">
                {user?.greeting}
              </h1>
              <div className="mt-12 flex items-center gap-3">
                <button className=" px-4 py-1.5 rounded text-slate-800 bg-gray-300 text-xs">
                  Follow
                </button>
                <button className=" px-4 py-1.5 rounded text-white bg-[#2FC4B2] text-xs">
                  Hire
                </button>
              </div>
            </div>
            <div className="w-full">
              <img src={PP} alt="art" className="w-[640px]" />
            </div>
          </div>

          <div className="py-16">
            <h3 className="text-lg font-medium">My Works</h3>
            <div className="grid grid-cols-3 gap-4 pt-6">
              {post?.map((item) => {
                return item.images
                  .map((item) => {
                    return <img key={item.id} src={item.image} alt="art" />;
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
