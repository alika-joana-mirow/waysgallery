import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
// import Gallery from "react-photo-gallery";
// import Lightbox from "react-images";
// import { useState } from "react";

import { API } from "../config/api";
import Navbar from "../components/Navbar";

import SearchIcon from "../assets/Search.svg";

export default function Home() {
  const { data: post, isLoading } = useQuery("post", async () => {
    const response = await API.get("/post");
    return response.data.data;
  });

  const postThumbnail = post?.map((item) => {
    return item.images[0];
  });

  console.log(postThumbnail);

  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // const photos = post.map((item) => {
  //   return item.images
  //     ?.map((img) => {
  //       return {
  //         src: img.image,
  //         width: Math.floor(Math.random() * 3) + 1, // lebar gambar acak dari 1-3
  //         height: Math.floor(Math.random() * 3) + 1, // tinggi gambar acak dari 1-3
  //       };
  //     })
  //     .shift(); // mengambil gambar pertama dalam array
  // });

  // const openLightbox = (index) => {
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // };

  // const closeLightbox = () => {
  //   setCurrentImage(0);
  //   setViewerIsOpen(false);
  // };

  return (
    <div>
      <Navbar />

      <div className="w-full pt-8 md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <select
              name="d-frilter"
              id="d-filter"
              className="bg-gray-200 border-none text-gray-600 text-xs rounded-md focus:ring-0 focus:border-none block w-full dark:bg-gray-700 dark:bborder-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="today">Today's</option>
              <option value="followed">Followed</option>
            </select>
          </div>

          <div>
            <form className="flex items-center">
              <div className="relative w-full">
                <div className="absolute flex inset-y-0 left-0 pl-3 items-center pointer-events-none">
                  <img src={SearchIcon} alt="" />
                </div>
                <input
                  type="text"
                  id="search-bar"
                  className="w-48 bg-gray-200 text-gray-900 text-xs border-none rounded-lg focus:border-none focus:ring-0 pl-10 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 font-bold text-lg">
          <h1>today's post</h1>
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <Spinner
                aria-label="Default status example"
                className="fill-[#2FC4B2]"
              />
            </div>
          ) : (
            // <div>
            //   <Gallery
            //     photos={photos}
            //     onClick={(event, { index }) => openLightbox(index)}
            //   />
            //   <Lightbox
            //     images={photos}
            //     backdropClosesModal={true}
            //     onClose={closeLightbox}
            //     onClickPrev={() => setCurrentImage(currentImage - 1)}
            //     onClickNext={() => setCurrentImage(currentImage + 1)}
            //     currentImage={currentImage}
            //     isOpen={viewerIsOpen}
            //   />
            // </div>
            <div className="pt-8 grid grid-cols-4 gap-3">
              {post?.map((item) => (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  {item.images
                    ?.map((img, index) => (
                      <img
                        key={index}
                        src={img.image}
                        alt="mantap"
                        width="250px"
                        height="200px"
                      />
                    ))
                    .shift()}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
