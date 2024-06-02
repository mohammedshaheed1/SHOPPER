import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
     
    const [image,setImage]=useState(false);

    const imageHandler=(e)=>{
         setImage(e.target.files[0]);
    }

    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"choose",
        new_price:"",
        old_price:""
    })
    
    const changeHandler=(e)=>{
         setProductDetails({
            ...productDetails,[e.target.name]:e.target.value
         })
    }

    const Add_Product=async()=>{
         
           let responseData;
           let product=productDetails;

           let formData= new FormData()
           formData.append('product',image)

           await fetch('http://localhost:4000/upload',{
               method:'post',
               headers:{
                   Accept:'application/json',
               },
              body:formData,
           }).then((resp)=>resp.json()).then((data)=>{responseData=data})

           if(responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
              method:'post',
              headers:{
                Accept:'application/json',
                'Content-Type': 'application/json', 
            },
            body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
              if (data.success) {
                toast.success("Product Added");
            } else {
                toast.error("Failed to add product");
            }
            })
           }
    }



  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Produt Title</p>
        <input type='text' name='name' value={productDetails.name} onChange={changeHandler} placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type='text' name='old_price' value={productDetails.old_name} onChange={changeHandler}  placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type='text' name='new_price' value={productDetails.new_price} onChange={changeHandler} placeholder='Type here'/>
        </div>
      </div>
      <div className="addproduct-itemfield">
          <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler}  name='category' className='add-product-selector'>
                <option value="">Choose</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kids</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor='file-input'>
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
          </label>
          <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
