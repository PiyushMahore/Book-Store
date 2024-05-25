import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/FirebaseContext'
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react"
import { NavLink } from 'react-router-dom';

function UsersOrder(props) {
    const Firebase = useFirebase()
    const [url, setUrl] = useState('')

    useEffect(() => {
        Firebase.downloadImg(props.ImgUrl).then((Url) => setUrl(Url))
    }, [])

  return (
    <div>
      <Card className="mt-14 w-96 col-span-1">
        <CardHeader color="blue-gray" className="relative h-56">
          <img src={url} alt="card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.BookName}
          </Typography>
          <Typography>
            The name of book is {props.BookName} and the Author is {props.Writer}.
          </Typography>
          <Typography className='font-bold text-black'>
            Price: ${props.Price}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
          <Button className='bg-green-600'><NavLink to={props.link}>View</NavLink></Button>
          <Button className='bg-red-600' onClick={() => Firebase.DeleteOrder(props.id)}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UsersOrder