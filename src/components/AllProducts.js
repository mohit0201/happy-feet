import React, { useContext } from 'react'
import Product from './Product'
import { Context } from '../Context'

function AllProducts() {
  const {
    shoesData,
    filteredList,
    filtersApplied,
    hasFinishedLoading,
  } = useContext(Context)

  const listToDisplay = filtersApplied ? filteredList : shoesData

  const allShoes = listToDisplay.map((shoe) => (
    <Product
      key={shoe.id}
      img={shoe.imageURL}
      productTitle={shoe.productTitle}
      price={shoe.price}
      discount={shoe.discount}
      discountedPrice={shoe.discountedPrice}
      rating={shoe.rating}
      id={shoe.id}
    />
  ))

  return (
    <>
      {hasFinishedLoading ? (
        <main className="products">{allShoes}</main>
      ) : (
        <p className="loading-products-text">Loading products...</p>
      )}
    </>
  )
}

export default AllProducts
