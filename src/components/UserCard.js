import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function UserCard({title, description, price, image, id, setArr, setOpen, setId}) {

const [press, setPress]= React.useState(false);
const [value, setValue]= React.useState(1);



const handleAddToCart=()=>{
  console.log(id);
  fetch("http://localhost:5002/user/addtocart", {
    method:"POST",
    headers:{
      'token': localStorage.getItem("token"),
      'Content-Type':'application/json',
    },
    body:{
      'courseID': id
    }
  }).then((e)=>e.json()).then(e=>console.log(e));
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
       {!press && <Button size="small" onClick={handleAddToCart}>Add to Cart</Button> }
       {press && <Button><Button onClick={(e)=>setValue(value+1)}>+</Button><input value={value} /><Button onClick={()=>setValue(value-1)}>-</Button></Button>}
      </CardActions>
    </Card>
  );
}
