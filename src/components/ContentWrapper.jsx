import React from "react";

const ContentWrapper = ({ children, className }) => {
  return (
    <div className={`w-full bg-gray-50 py-6 pt-0 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
};

export default ContentWrapper;
