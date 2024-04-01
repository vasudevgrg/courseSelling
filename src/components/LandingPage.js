import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card1 from "./Card1";

const LandingPage = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((e) => e.json())
      .then((e) => {
        setArr(e);
       
      });
  }, []);
  console.log(arr);
  return (
    <>
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
            <Card1 title={e.title} description={e.description} price={e.price} image={e.image} />
          ))}
        </div>
       
      </div>
    </>
  );
};


export default LandingPage;
