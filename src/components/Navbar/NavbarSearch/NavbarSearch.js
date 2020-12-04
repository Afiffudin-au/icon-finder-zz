import React, { useState } from 'react'
import './NavbarSearch.scss'
import { useGetSearch } from '../../../useSearch/useGetSearch'
import { useDispatch } from 'react-redux'
import { addParams } from '../../../features/URLparamaterSlice'
import { useHistory } from 'react-router-dom'
function NavbarSearch() {
  const [query,setQuery] = useState('')
  const {getSearch} = useGetSearch()
  const dispatch = useDispatch()
  const history = useHistory()
  const handleSearch = (e) => {
    e.preventDefault()
    const userText = query.replace(/^\s+/, '').replace(/\s+$/, '');
    if(userText === ''){
      return
    }
    dispatch(addParams({
      query : query
    }))
    getSearch(query)
    history.push('/icon-search')
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
