import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useFirebase } from '../Context/FirebaseContext';

function BooksCard(props) {
    const [url, setUrl] = useState('')
    const Firebase = useFirebase()
    
    useEffect(() => {
      Firebase.downloadImg(props.imageUrl).then((Url) => setUrl(Url))
    }, [Firebase])

    return (
      <Card className="mt-14 w-96 col-span-1">
        <CardHeader color="blue-gray" className="relative h-56">
          <img src={url} alt="card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.name}
          </Typography>
          <Typography>
            The name of book is {props.name} and the Author is {props.author}.
          </Typography>
          <Typography className='font-bold text-black'>
            Price: ${props.price}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
          <Button className='bg-green-600'><NavLink to={props.link}>View</NavLink></Button>
          {Firebase.owner ? <Button className='bg-red-600' onClick={() => Firebase.DeleteBook(props.id)}>Delete</Button> : null}
        </CardFooter>
      </Card>
  )
}

export default BooksCard
