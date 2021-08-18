import React, { useContext } from 'react'
import { Context } from '../Context'

function Product(props) {
  const { buyItem } = useContext(Context)

  const ratingBoxClassName =
    props.rating >= 3.5
      ? 'good'
      : props.rating > 2.5 && props.rating < 3.5
      ? 'average'
      : 'poor'

  return (
    <div className="product-container">
      <img src={props.img} className="image-grid" alt="some_image" />
      <button
        className="buy-button"
        onClick={() => buyItem(props.id)}
      >
        Buy
      </button>
      <p className="product-title">{props.productTitle}</p>
      <div className="rating-container">
        <div className={`rating-box ${ratingBoxClassName}`}>
          <p className="rating">{`${props.rating}★`}</p>
        </div>
      </div>
      <div className="price-box">
        <span className="discounted-price">
          {`₹${props.discountedPrice}`}
        </span>
        <span className="product-price">{`₹${props.price}`}</span>
        <span className="product-discount">{`${props.discount}% off`}</span>
      </div>
    </div>
  )
}

export default Product
