import React from 'react'
import { useNavigate } from "react-router-dom";
const Product = (props) => {
    const{product}=props
    const Navigate=useNavigate()
   const navigationHandler=(id)=>{
    console.log(id)
    Navigate(`/products/${id}`)

   }
  return (
   
      <span className='product' onClick={()=>navigationHandler(product.id)}>
        <img src={product.thumbnail} alt={product.title}/>
        <span style={{display:"flex",justifyContent:"space-between"}}>
        <span>{product.title}</span>
        <span>Price:{product.price}</span>
        </span>
     
      </span>
   
  )
}

export default Product
