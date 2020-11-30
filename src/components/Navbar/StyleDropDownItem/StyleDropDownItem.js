import React from 'react'
import { Link } from 'react-router-dom'

function StyleDropDownItem({styleIdentifier}) {
  return (
    <Link to="/" className="dropdown-item">
      {styleIdentifier}
    </Link>
  )
}

export default StyleDropDownItem
