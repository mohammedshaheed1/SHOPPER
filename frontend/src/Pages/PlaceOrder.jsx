import React, { useContext } from 'react'
import './CSS/PlaceOrder.css'
import { ShopContext } from '../Context/ShopContext'


function PlaceOrder() {

    const { getTotalCartAmount } = useContext(ShopContext)
    return (
        <div className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
            
            <div className="multifield">
                <input type="text" placeholder='First Name' />
                <input type="text" placeholder='Last Name' />
            </div>
            <input type="email" placeholder='Email Address' />
            <input type="text" placeholder='Street' />
            <div className="multifield">
                <input type="text" placeholder='City' />
                <input type="text" placeholder='State' />
            </div>
            <div className="multifield">
                <input type="text" placeholder='Zip Code' />
                <input type="text" placeholder='Country' />
            </div>
            <input type="text" placeholder='Phone' />
           </div>
            <div className="place-order-right">

                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-items">
                            <p>Sub Total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO PAYMENT</button>
                </div>

            </div>

        </div>
    )
}

export default PlaceOrder