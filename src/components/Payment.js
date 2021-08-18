import React, { useContext } from 'react'
import { Context } from '../Context'

function Payment() {
  const {
    cancelBuyItem,
    processPayment,
    orderProcessing,
    itemToBuy,
  } = useContext(Context)

  return (
    <>
      <main className="payment-page">
        <div className="cart-item-container" key={itemToBuy.id}>
          <div className="cart-item-details">
            <img
              className="prev-item-image"
              src={itemToBuy.imageURL}
              alt="some_image"
            />
            <div className="prev-item-details-container">
              <p className="prev-item-title">
                {itemToBuy.productTitle}
              </p>
              <p className="prev-item-color">{`Color: ${itemToBuy.color}`}</p>
              <p className="prev-item-seller">{`Seller: ${itemToBuy.seller}`}</p>
            </div>
            <p className="prev-item-price">{`₹${itemToBuy.discountedPrice}`}</p>
          </div>

          <hr />

          <div className="payments-page-button-container">
            <p className="cart-item-price">{`Total Amount: ₹${itemToBuy.discountedPrice}`}</p>
            <button
              className="pay-button"
              onClick={() => processPayment()}
              disabled={orderProcessing ? true : false}
            >
              Pay
            </button>
            <button
              className="payment-cancel-button"
              onClick={() => cancelBuyItem()}
              disabled={orderProcessing ? true : false}
            >
              Cancel
            </button>
          </div>
        </div>
        {orderProcessing ? (
          <p className="processing-payment">Processing payment...</p>
        ) : (
          <></>
        )}
      </main>
    </>
  )
}

export default Payment
