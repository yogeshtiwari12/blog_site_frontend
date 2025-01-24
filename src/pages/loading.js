import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning Loader */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-300 rounded-full opacity-50"></div>
        </div>

        {/* Loading Text */}
        <p className="text-lg font-semibold text-gray-700">
          Loading<span className="animate-pulse">...</span>
        </p>

        {/* Optional Subtext */}
        <p className="text-sm text-gray-500">
          Please wait while we fetch your content.
        </p>
      </div>
    </div>
  );
}

export default Loading;
