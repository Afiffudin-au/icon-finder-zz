import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './SearchBanner.scss'
import { useGetSearch } from '../../../useSearch/useGetSearch';
function SearchBanner() {
  const [query,setQuery] = useState('')
  const {getSearch} = useGetSearch()
  const handleSearch = (e)=>{
    e.preventDefault()
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '');
    if(userText === ''){
      return
    }
    getSearch(query)
  }
  return (
    <div className="searchBanner">
      <div className="searchBanner_box">
        <form onSubmit={handleSearch}>
          <input onChange={(e)=>setQuery(e.target.value)} placeholder="Search for icons, e.g laptop,pencil,..." className="searchBanner_input" type="text"/>
          <button style={{display : 'none'}}></button>
          <SearchIcon style={{color: 'rgb(90, 90, 90)'}}/>
        </form>
      </div>
    </div>
  )
}

export default SearchBanner
