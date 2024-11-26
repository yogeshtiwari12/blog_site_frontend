import React from "react";
import { useAuth } from "../context/authcontext.js";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const customStyles = `
    .react-multi-carousel-dot-list {
      bottom: -3px;
    }
    .react-multi-carousel-dot button {
      border-color: #3B82F6;
    }
    .react-multi-carousel-dot--active button {
      background: #3B82F6;
    }
  `;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <style>{customStyles}</style>
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
        Trending
      </h1>
      <div className="pb-12"> {/* Added padding bottom for dots */}
        <Carousel
          responsive={responsive}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          className="pb-8"
        >
          {blogs && blogs.length > 0 ? (
            blogs.slice(0, 5).map((element) => (
              <div
                key={element._id}
                className="mx-2 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link to={`/singleblog/${element._id}`} className="block h-full">
                  <div className="relative">
                    <img
                      src={element.blogimage.url}
                      alt={element.title}
                      className="w-full h-64 object-cover rounded-t-xl"
                    />
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium tracking-wide shadow-lg">
                      {element.category}
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-b-xl">
                    <h1 className="text-xl font-bold mb-4 line-clamp-2 text-gray-800 hover:text-blue-600 transition-colors duration-300">
                      {element.title}
                    </h1>
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={element.adminphoto}
                          alt=""
                          className="w-12 h-12 rounded-full border-2 border-blue-400 transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-semibold text-gray-800">
                          {element.adminname}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          New
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex h-96 items-center justify-center w-full">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-lg font-medium text-gray-600">Loading...</p>
              </div>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default Trending;