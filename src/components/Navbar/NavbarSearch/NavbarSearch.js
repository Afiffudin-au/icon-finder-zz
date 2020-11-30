import React, { useState } from 'react'
import './NavbarSearch.scss'
import { useGetSearch } from '../../../useSearch/useGetSearch'
function NavbarSearch() {
  const [query,setQuery] = useState('')
  const {getSearch} = useGetSearch()
  const handleSearch = (e) => {
    e.preventDefault()
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '');
    if(userText === ''){
      return
    }
    getSearch(query)
  }
  return (
    <>
      <form onSubmit={handleSearch} className="form-inline my-2 my-lg-0">
        <input onChange={(e)=>setQuery(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search and enter" aria-label="Search" />
        <button style={{ display: 'none' }}></button>
      </form>
    </>
  )
}

export default NavbarSearch
