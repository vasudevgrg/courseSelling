import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card1 from "./Card1";

import Modal from "./Modal";

const LandingPage = () => {
  const [arr, setArr] = useState([]);
  const [open, setOpen]= useState(false);
  let [id, setId]= useState("");

  // console.log(localStorage.getItem("token"));

  

  useEffect(() => {
    fetch("http://localhost:5002/admin/courses",{
      method:"get",
      headers:{
        'Content-Type':'application/json',
        'token': localStorage.getItem('token')
      }
    })
      .then((e) => e.json())
      .then((e) => {
        setArr(e.courses);
       
      });
  }, []);
  // console.log(arr);
  return (
    <>
  {open &&  <Modal setOpen={setOpen} id={id} setArr={setArr} />}
      <Navbar arr={arr} setArr={setArr} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>All Available Live Courses</h1>
        <div style={{display:"flex", flexDirection:"row", margin:"10px", flexWrap:"wrap"}}>
          
          {arr.map((e) => (
            <Card1 title={e.title} description={e.description} price={e.price} image={e.image} id={e._id} setArr={setArr} setOpen={setOpen} setId={setId} />
            
          ))}
        </div>
       
      </div>
      </>
  );
};


export default LandingPage;
