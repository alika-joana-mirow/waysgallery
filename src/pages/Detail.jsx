import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Avatar, Carousel } from "flowbite-react";

import { API } from "../config/api";
import Navbar from "../components/Navbar";

import PP from "../assets/PP.png";

export default function Detail() {
  const { id } = useParams();

  const { data: postDetail } = useQuery("postDetail", async () => {
    const response = await API.get(`/post/${id}`);
    return response.data.data;
  });

  return (
    <div>
      <Navbar />

      <div className="max-w-screen-md mx-auto py-8">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link>
              <Avatar img={PP} rounded size="md" />
            </Link>

            <div>
              <h1 className="font-semibold">{postDetail?.title}</h1>
              <h1 className="text-sm text-gray-600">
                {postDetail?.user.fullname}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="py-1.5 px-4 bg-gray-300 text-sm font-semibold rounded">
              Follow
            </button>
            <Link>
              <button className="py-1.5 px-4 bg-[#2FC4B2] text-sm font-semibold rounded">
                Hire
              </button>
            </Link>
          </div>
        </div>

        <div className="pt-8">
          <Carousel className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            {postDetail?.images.map((item, index) => (
              <img src={item.image} alt="image" key={index} />
            ))}
          </Carousel>

          <div className="mt-3">
            <h3 className="font-extrabold">
              👋 Say Hello <span>{postDetail?.user.email}</span>
            </h3>
            <p className="mt-3">{postDetail?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
