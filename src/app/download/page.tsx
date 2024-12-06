"use client";
import { Star } from "lucide-react";
import dynamic from "next/dynamic";

const DownloadCheck = dynamic(
  () => {
    return import("../../components/downloadCheck");
  },
  { ssr: false }
);

const page = () => {
  return (
    <div className="mx-2 pt-8 bg-white rounded-lg w-full z-50 px-5 sm:mx-7 md:px-16 flex flex-col items-end lg:mx-[186px] md:pt-28 lg:px-28 xl:px-44 2xl:px-52 2xl:items-center md:rounded-none mb-9">
      <div className="">
        <h1 className="font-semibold text-lg mb-6 md:text-3xl md:font-medium">
          Huntgame: Chat, Meetup, Dating.
        </h1>
        <div className="flex gap-4 md:gap-7 mb-3.5 items-center md:mb-8">
          <img
            alt="hunt game logo"
            src="/hunterslogo.png"
            className="size-11 md:size-24 md:mr-5"
          />
          <span className="flex flex-col justify-between md:justify-center text-xs md:text-lg py-1 border-r border-[#9B9B9B] pr-5 md:h-fit">
            <span className="flex gap-1 items-center">
              4.5 <Star className="text-[#C7920F] size-3" fill="#C7920F" />
            </span>
            <p>6.5k Reviews</p>
          </span>
          <span className="flex flex-col justify-between md:justify-center md:items-center text-xs md:text-lg py-1 border-r border-[#9B9B9B] pr-5 md:h-fit">
            <p>200k+</p>
            <p>Downloads</p>
          </span>
          <span className="flex flex-col justify-between md:justify-center text-xs md:text-lg py-1">
            <p>18+</p>
            <p>Rated 18y+</p>
          </span>
        </div>
        <DownloadCheck />
        <p className="text-sm mb-2 md:text-[1.375rem] md:mb-4">
          Huntgame in screenshots
        </p>
        <div className="overflow-x-auto mb-11 gap-2 md:gap-6 flex">
          <img src="/hunt1.png" alt="" />
          <img src="/hunt2.png" alt="" />
          <img src="/hunt3.png" alt="" />
          <img src="/hunt4.png" alt="" />
        </div>
      </div>
      {/* <h3 className="font-extrabold text-lg mb-7">About this app</h3> */}
    </div>
  );
};

export default page;
