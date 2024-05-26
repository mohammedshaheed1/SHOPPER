import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDispaly from '../Components/ProductDisplay/ProductDispaly'
import DiscriptionBox from '../Components/DiscriptionBox/DiscriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

function Product() {
  const {all_product}=useContext(ShopContext)
  const {productId}=useParams()
  const product=all_product.find((e)=>e.id===Number(productId))
  return (
    <div>
         <Breadcrum product={product}/>
         <ProductDispaly product={product}/>
         <DiscriptionBox/>
         <RelatedProducts/>
         
    </div>
  )
}

export default Product