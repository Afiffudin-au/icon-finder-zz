import React, {useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGetCatagoryIdentifier } from '../../useCatagoryIdentifier/useGetCatagoryIdentifier'
import { useGetIconsAll } from '../../useiconsAll/useGetIconsAll'
import { useGetStyleIdentifier } from '../../useStyleIdentifier/useGetStyleIdentifier'
import CatagoriesDropDownItem from './CatagoriesDropDownItem/CatagoriesDropDownItem'
import './Navbar.scss'
import NavbarSearch from './NavbarSearch/NavbarSearch'
import StyleDropDownItem from './StyleDropDownItem/StyleDropDownItem'
import MenuIcon from '@material-ui/icons/Menu';
function Navbar() {
  const {getCatagoryIdentifier,dataCatagory} = useGetCatagoryIdentifier()
  const {getStyleIdentifier,dataStyles} = useGetStyleIdentifier()
  const refGetCatagoryIdentifier= useRef(getCatagoryIdentifier)
  const refGetStyleIdentifier = useRef(getStyleIdentifier)
  const {getIconsAll} = useGetIconsAll()
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
    refGetStyleIdentifier.current()
    refGetCatagoryIdentifier.current()
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
        <MenuIcon className="menuIcon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <p className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Icon sets
            </p>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link onClick={()=>getIconsAll('')} to="/icon-all" className="dropdown-item">
                All icons
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <p className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Catagories
            </p>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {
                dataCatagory?.categories?.map((item,index)=>(
                  <CatagoriesDropDownItem key={index} Catagoryidentifier={item.identifier} name={item.name}/>
                ))
              }
            </div>
          </li>
          <li className="nav-item dropdown">
            <p className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Styles
            </p>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {
                dataStyles?.styles?.map((item,index)=>(
                  <StyleDropDownItem key={index} styleIdentifier={item.identifier} name={item.name}/>
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
