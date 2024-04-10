import React from 'react'

const SubCard = ({course}) => {
  console.log(course);
  return (
    <>
    <div style={{display:"flex", flexDirection:"row", alignItems:"start" , justifyContent:"center"}}>
                  <img src={course.image} alt=""/>
                  <h3>{course.title}</h3>
                  <span>${course.price}</span>
                </div>
    </>
  )
}

export default SubCard