import React from 'react';
import './Modal.css';


const AddToCartModal = ({setOpen, courseArr}) => {





  return (
    <>
    <div className="wrapper" onClick={()=>setOpen(false)}></div>

    <div className="container" style={{display:"flex", flexDirection:"column", margin:"10px"}}>
        {
            courseArr.map((e)=>)
        }
    </div>
    </>
  )
}

export default AddToCartModal