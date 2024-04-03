import React from 'react';
import './Modal.css';


const Modal = ({setOpen, id, setArr}) => {
const [title, setTitle]= React.useState("");
const [description, setDescription]= React.useState("");
const [price, setPrice]= React.useState();
const [image, setImage]= React.useState("");

console.log(id);

const handleUpdate=()=>{
    fetch(`http://localhost:5002/admin/course/${id}`, {
        method: "put",
        headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem("token")   
        },
        body:JSON.stringify({
            "title":title,
            "description": description,
            "price":price,
            "image":image
        })
    }).then(e=>e.json()).then(e=>{setArr(e.arr); setOpen(false);});
}

  return (
    <>
    <div className="wrapper" onClick={()=>setOpen(false)}></div>

    <div className="container" style={{display:"flex", flexDirection:"column", margin:"10px"}}>
        <label>Update title:</label>
        <input  onChange={(e)=>setTitle(e.target.value)}/>
        <label>description</label>
        <input onChange={(e)=>setDescription(e.target.value)}/>
        <label>update price:</label>
        <input onChange={(e)=>setPrice(e.target.value)}/>
        <label>update Image:</label>
        <input onChange={(e)=>setImage(e.target.value)}/>
        <button onClick={handleUpdate}>Update</button>
    </div>
    </>
  )
}

export default Modal