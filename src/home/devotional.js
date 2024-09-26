import React from 'react';
import { useAuth } from '../context/authcontext.js';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Devotional() {
    const { blogs } = useAuth();
    console.log("blogs avd ",blogs)

    const filteredBlogs = blogs.filter(blog => blog.category === 'devotional');

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
            <h1 className="text-2xl font-semibold mb-4">Devotional Content</h1>
            <Carousel responsive={responsive} showDots={true}>
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((element) => (
                        <div
                            key={element._id}
                            className="p-4 bg-white border-2 shadow-md rounded-lg transform hover:shadow-xl mx-2"
                        >
                            <Link to={`/blog/${element._id}`}>
                                <div className="group relative">
                                    <img
                                        src={element.blogimage.url}
                                        alt={element.title}
                                        className="w-full h-56 object-cover rounded-t-lg"
                                    />
                                    <div className="absolute bottom-4 left-4">
                                        <h1 className="text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                                            {element.title}
                                        </h1>
                                        <p className="text-white text-sm mt-1 group-hover:text-yellow-400 transition-colors duration-300">
                                            {element.category}
                                        </p>
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

export default Devotional;
