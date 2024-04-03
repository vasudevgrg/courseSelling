import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card1 from "./Card1";
import BasicModal from "./BasicModal";

const LandingPage = () => {
  const [arr, setArr] = useState([]);
  const [open, setOpen]= useState(false);

  console.log(localStorage.getItem("token"));

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
  console.log(arr);
  return (
    <>
    {open && <BasicModal/>}
      <Navbar />
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
            <Card1 title={e.title} description={e.description} price={e.price} image={e.image} id={e._id} setArr={setArr} setOpen={setOpen} />
          ))}
        </div>
       
      </div>
    </>
  );
};


export default LandingPage;
