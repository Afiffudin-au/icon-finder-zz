import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetCatagory } from '../../useCatagory/useGetCatagory'
import { useGetStyleIdentifier } from '../../useStyleIdentifier/useGetStyleIdentifier'
import CatagoriesDropDownItem from './CatagoriesDropDownItem/CatagoriesDropDownItem'
import './Navbar.scss'
import NavbarSearch from './NavbarSearch/NavbarSearch'
import StyleDropDownItem from './StyleDropDownItem/StyleDropDownItem'
function Navbar() {
  const {getCatagory,dataCatagory} = useGetCatagory()
  const {getStyleIdentifier,dataStyles} = useGetStyleIdentifier()
  const handleScroll = ()=>{
    const navbar = document.querySelector(".navbar")
    const inputSearch = document.querySelector('.navbar input')
    if (window.scrollY > 20) {
      inputSearch.classList.add('inputSearchColor')
      navbar.classList.add('scroll')
    } else {
      inputSearch.classList.remove('inputSearchColor')
      navbar.classList.remove('scroll')
    }
  }
  useEffect(()=>{
    getCatagory()
    getStyleIdentifier()
  },[])
  useEffect(()=>{
    window.addEventListener("scroll", handleScroll);
    return ()=>{
      window.removeEventListener("scroll", handleScroll);
    }
  },[])
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Icon sets
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link to="/" className="dropdown-item">
                All icons
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Catagories
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {
                dataCatagory?.categories?.map((item,index)=>(
                  <CatagoriesDropDownItem key={index} Catagoryidentifier={item.identifier}/>
                ))
              }
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Styles
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {
                dataStyles?.styles?.map((item,index)=>(
                  <StyleDropDownItem key={index} styleIdentifier={item.identifier}/>
                ))
              }
              
            </div>
          </li>
        </ul>
        <NavbarSearch/>
      </div>
    </nav>
  )
}

export default Navbar
