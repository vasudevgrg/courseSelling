import React from 'react';
import './Modal.css';
import SubCard from './SubCard';


const AddToCartModal = ({setOpen, courseArr}) => {


const fetchcourse=async(id)=>{
 let ans=await fetch(`http://localhost:5002/courses/${id}`);
 console.log(ans);
 return ans;
}

  return (
    <>
    <div className="wrapper" onClick={()=>setOpen(false)}></div>

    <div className="container" style={{display:"flex", flexDirection:"column", margin:"10px"}}>
        {
            courseArr.map( (e)=>{
                let course=  fetchcourse(e.courseID);
                console.log(course);
                <SubCard  course={course}/>
            })
        }
    </div>
    </>
  )
}

export default AddToCartModal