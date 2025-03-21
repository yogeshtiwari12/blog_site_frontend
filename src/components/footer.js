import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-100">
      
      <section className="relative overflow-hidden py-10">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap -m-6">
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
              <div className="flex h-full flex-col justify-between">
                {/* Logo */}
                <div className="mb-4 inline-flex items-center">
                  <div className="text-md font-bold text-gray-900 text-2xl">
                    <h3>Blo<span className="text-2xl text-blue-500">gs</span></h3>
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-base font-medium">The Best Place for Your Reading</p>
                  <p className="text-sm text-gray-600">
                    &copy; Copyright 2024. All Rights Reserved by Blogs.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Company</h3>
              <ul>
                <li className="mb-4">
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Features</a>
                </li>
                <li className="mb-4">
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Pricing</a>
                </li>
                <li className="mb-4">
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Affiliate Program</a>
                </li>
                <li>
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Press Kit</a>
                </li>
              </ul>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Support</h3>
              <ul>
                <li className="mb-4">
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Account</a>
                </li>
                <li className="mb-4">
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Help</a>
                </li>
                <li className="mb-4">
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Contact Us</a>
                </li>
                <li>
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Customer Support</a>
                </li>
              </ul>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Legals</h3>
              <ul>
                <li className="mb-4">
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Terms &amp; Conditions</a>
                </li>
                <li className="mb-4">
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Privacy Policy</a>
                </li>
                <li>
                  <a className="text-base font-medium text-gray-900 hover:text-gray-700" href="#">Licensing</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
