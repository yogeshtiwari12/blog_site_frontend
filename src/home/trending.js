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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <Carousel responsive={responsive} showDots={true}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 5).map((element) => (

            <div
              key={element._id}
              className="p-4 bg-white border-2 w shadow-md rounded-lg shadow-md transform  hover:shadow-xl mx-2"
              // style={{ padding: "16px" }}
            >
              <Link
              to={`/singleblog/${element._id}`}>
                <div className="relative">
                  <img
                    src={element.blogimage.url}
                    alt={element.title}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 flex rounded-full text-sm">
                    {element.category}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between">
                  <h1
                    className="text-lg font-bold mb-2 overflow-hidden text-ellipsis transition-colors  hover:text-yellow-500"
                   
                  >
                    {element.title}
                  </h1>
                  <div className=" flex items-center">
                <img
                  src={element.adminphoto}
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {element.adminname}
                  </p>
                  <p className="text-xs text-gray-400">New</p>
                </div>
              </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex h-screen items-center justify-center">
            Loading....
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
