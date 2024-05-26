import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function ProductDispaly(props) {
    const {product}=props
    const {addToCart}=useContext(ShopContext)


    const notify = () => {
        toast.success("Added Product into cart");
      };
    

  return (
   <div className="productdisplay">
     <div className="productdisplay-left">
         <div className="productdisplay-img-list">
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
         </div>
         <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" /> 
         </div>
     </div>
     <div className="productdisplay-right">
    <h1>{product.name}</h1>
    <div className="productdisplay-right-stars">
       <img src={star_icon} alt="" />
       <img src={star_icon} alt="" />
       <img src={star_icon} alt="" />
        <img src={star_icon} alt="" />
        <img src={star_dull_icon} alt="" />
        <p>(122)</p>
    </div>
    <div className="productdisplay-right-prices">
        <div className="productdisplay-right-price-old">${product.old_price}</div>
        <div className="productdisplay-right-price-new">${product.new_price}</div>
    </div>
    <div className="productdisplay-right-discription">
        A lightweight, usually knitted, pullover shirt, close fitting and with a round neckline and short sleeves worn as an undershirt or outer garment
    </div>
    <div className="productdisplay-right-size">
        <h1>Select Size</h1>
        <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
        </div>
    </div>
    <button onClick={()=>{addToCart(product.id);notify();}}>ADD TO CART</button>
    <p className="productdisplay-right-category"><span>Category:</span>Women ,T-Shirt, Crop TOP</p>
    <p className="productdisplay-right-category"><span>Tags:</span>Modern ,Latest, Crop Top</p>
     </div>
   </div>
  )
}

export default ProductDispaly