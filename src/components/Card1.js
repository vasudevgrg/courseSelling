import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Card1({title, description, price, image, id, setArr, setOpen}) {

const remove=(id)=>{
  console.log(id.id);
    fetch(`http://localhost:5002/admin/course/${id.id}`,{
      method:"delete",
      headers:{
        'Content-Type':'application/json',
        'token':localStorage.getItem("token")   
      }
    }).then(e=>e.json()).then(e=>{setArr(e.arr);console.log(e);});
};

const handleEdit=()=>{
  setOpen(true);
}


  return (
    <Card sx={{ maxWidth: 345 }} style={{height:"100%", maxHeight:"100%", overflow:"auto"}}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEdit} >Edit</Button>
        <Button size="small" onClick={()=>remove({id})}>Remove</Button>
      </CardActions>
    </Card>
  );
}
