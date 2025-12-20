import React from "react";

const HomeHeader = () => {
  return (
    <div className="absolute inset-0 z-10 left-12 flex items-center">
      <div className="mx-auto max-w-7xl px-4 w-full">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Discover Premium Properties in UAE
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Buy & rent luxury homes, apartments and villas across Dubai, Abu
            Dhabi and more.
          </p>

          <button className="mt-6 inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition">
            Explore Listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
