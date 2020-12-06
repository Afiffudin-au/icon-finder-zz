import React, { useEffect, useState } from 'react'
import './NavbarSearch.scss'
import { useGetSearch } from '../../../useSearch/useGetSearch'
import { useDispatch, useSelector } from 'react-redux'
import { addParams, selectUrlParamsBlock } from '../../../features/URLparamaterSlice'
import { useHistory } from 'react-router-dom'
function NavbarSearch() {
  const [query,setQuery] = useState('')
  const {getSearch} = useGetSearch()
  const dispatch = useDispatch()
  const history = useHistory()
  const urlParamsBlock = useSelector(selectUrlParamsBlock)
  const queryParams = urlParamsBlock.query
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
  useEffect(()=>{
    setQuery(queryParams)
  },[queryParams])
  return (
    <>
      <form onSubmit={handleSearch} className="form-inline my-2 my-lg-0">
        <input value={query || ''} onChange={(e)=>setQuery(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search and enter" aria-label="Search" />
        <button style={{ display: 'none' }}></button>
      </form>
    </>
  )
}

export default NavbarSearch
