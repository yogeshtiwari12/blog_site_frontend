import React from 'react';
import { useAuth } from '../context/authcontext.js';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Devotional() {
    const { blogs } = useAuth();
    // console.log("blogs avd ", blogs)

    const filteredBlogs = blogs? blogs.filter(blog => blog.category === 'devotional'):[];

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
        <div className="container mx-auto px-4 py-8 ">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
                Devotional Content
            </h1>
            <Carousel 
                responsive={responsive} 
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                className="pb-12"
            >
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((element) => (
                        <div
                            key={element._id}
                            className="p-4 bg-white border-2 border-gray-100 shadow-md rounded-lg transform hover:shadow-xl mx-2 transition-all duration-300"
                        >
                            <Link to={`/blog/${element._id}`}>
                                <div className="group relative overflow-hidden rounded-lg">
                                    <img
                                        src={element.blogimage.url}
                                        alt={element.title}
                                        className="w-full h-56 object-cover rounded-t-lg transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h1 className="text-white text-xl font-bold group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                            {element.title}
                                        </h1>
                                        <p className="text-gray-200 text-sm mt-2 group-hover:text-blue-300 transition-colors duration-300">
                                            {element.category}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="flex h-screen items-center justify-center">
                        <div className="text-lg text-gray-600 font-medium">
                            Loading...
                        </div>
                    </div>
                )}
            </Carousel>
        </div>
    );
}

export default Devotional;