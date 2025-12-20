import React from "react";

const ContentWrapper = ({ children, className = "" }) => {
  return (
    <div
      className={`mx-auto max-w-7xl px-4 sm:px-6 bg-gray-50 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
