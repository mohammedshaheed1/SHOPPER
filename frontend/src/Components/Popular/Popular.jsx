import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'



function Popular() {
  const[popularinwomen,setPopularInWomen]=useState([]);

      useEffect(()=>{
         fetch('http://localhost:4000/popularinwomen')
         .then((response)=>response.json())
         .then((data)=>setPopularInWomen(data))
        },[])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popular-item">
            {popularinwomen.map((item,i)=>{
               return <Item key={i}  id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular