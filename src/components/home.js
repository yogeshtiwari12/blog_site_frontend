import React from 'react'
// import Hero from '../home/hero'
import Hero from '../home/hero';
import Trending from '../home/trending';
import Devotional from '../home/devotional';
import Creator from '../home/creator';
// import Footer from './footer.js';
function Home() {

  return (
    <div >
     <Hero/>
     <Trending/>
     <Devotional/>
     <Creator/>
    </div>
  )
}

export default Home
