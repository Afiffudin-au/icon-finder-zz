import React from 'react'
import { Link } from 'react-router-dom'

function CatagoriesDropDownItem({Catagoryidentifier}) {
  return (
    <Link to="/" className="dropdown-item">
      {Catagoryidentifier}
    </Link>
  )
}

export default CatagoriesDropDownItem
