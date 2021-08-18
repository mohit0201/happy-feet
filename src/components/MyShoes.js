import React, { useContext } from 'react'
import { Context } from '../Context'

function MyShoes() {
  const { itemsBought } = useContext(Context)

  const items = itemsBought.map((item) => (
    <div className="prev-bought-item-container" key={item.id}>
      <img
        className="prev-item-image"
        src={item.imageURL}
        alt="some_image"
      />
      <div className="prev-item-details-container">
        <p className="prev-item-title">{item.productTitle}</p>
        <p className="prev-item-color">{item.color}</p>
        <p className="prev-item-seller">{item.seller}</p>
      </div>
      <p className="prev-item-price">{`₹${item.discountedPrice}`}</p>
    </div>
  ))

  return (
    <main className="my-shoes">
      <hr />
      <p className="prev-item-heading">My Shoes</p>
      {items.length ? (
        <>{items}</>
      ) : (
        <p className="prev-items-placeholder">
          Products you buy will appear here
        </p>
      )}
    </main>
  )
}

export default MyShoes
