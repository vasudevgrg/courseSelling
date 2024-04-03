import React from 'react';
import './Modal.css';


const Modal = ({setOpen}) => {
const [title, setTitle]= React.useState("");
const [description, setDescription]= React.useState("");
const [price, setPrice]= React.useState();
const [image, setImage]= React.useState("");

const handleUpdate=()=>{
    
}

  return (
    <>
    <div class="wrapper" onClick={()=>setOpen(false)}></div>

    <div class="container" style={{display:"flex", flexDirection:"column", margin:"10px"}}>
        <label>Update title:</label>
        <input/>
        <label>description</label>
        <input/>
        <label>update price:</label>
        <input/>
        <button onClick={handleUpdate}>Update</button>
    </div>
    </>
  )
}

export default Modal