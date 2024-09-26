
import React from 'react'

function Errorpage() {
  return (
    <div>


  return (
    <div className="mx-auto w-full max-w-7xl px-2 md:px-4">
      <main>
        <div className="flex h-screen items-center justify-center text-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">404</h1>
            <p className="text-lg font-semibold text-gray-700">Page not found</p>
            <p className="text-gray-500 mt-2">
              Sorry, the page you’re looking for doesn’t exist.
            </p>
            <a
              href="/"
              className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-white font-semibold hover:bg-black/80"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </div>
  )


    </div>
  )
}

export default Errorpage
