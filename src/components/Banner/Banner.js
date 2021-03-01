import React from 'react'
import './Banner.scss'
import SearchBanner from './SearchBanner/SearchBanner'
function Banner() {
  return (
    <div className='banner jumbotron jumbotron-fluid d-flex justify-content-center align-items-center'>
      <div className='container'>
        <p className='banner_title text-center'>Icon-finder-zz</p>
        <SearchBanner />
        <div className='banner_content text-center'>
          <p className='banner_title'>
            Search through 5,074,108 SVG or PNG icons
          </p>
        </div>
      </div>
    </div>
  )
}

export default Banner
