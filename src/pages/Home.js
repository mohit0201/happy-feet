import React from 'react'
import FilterBar from '../components/FilterBar'
import AllProducts from '../components/AllProducts'
import MyShoes from '../components/MyShoes'
import SortItemBar from '../components/SortItemBar'

function Home() {
  return (
    <div className="grid-container">
      <FilterBar />
      <SortItemBar />
      <AllProducts />
      <MyShoes />
    </div>
  )
}

export default Home
