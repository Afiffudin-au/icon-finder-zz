import React from 'react'

function BtnGroupItems({identifier}) {
  const handleFilter = ()=>{
    
  }
  return (
    <>
       <button onClick={handleFilter} type="button" className="btn btn-outline-primary">{identifier}</button> 
    </>
  )
}

export default BtnGroupItems
