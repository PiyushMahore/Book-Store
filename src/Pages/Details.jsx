import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Components/Loading'
import { useFirebase } from '../Context/FirebaseContext'
import { Button } from "@material-tailwind/react";

function Details() {
    const Firebase = useFirebase()
    const Params = useParams()
    const [url, setUrl] = useState(null)
    const [bookDtl, setBookDtl] = useState(null)
    const [qty, setQty] = useState(1)

    useEffect(() =>{
        Firebase.getDocument(Params.id).then((res) => setBookDtl(res.data()))
    }, [])

    useEffect(() => {
        if(bookDtl) {
            Firebase.downloadImg(bookDtl.imageUrl).then((res) => setUrl(res))
        }
    }, [bookDtl])

    const handleSubmit = async(e) => {
        e.preventDefault()
        await Firebase.placeOrder(Params.id, bookDtl.name , qty)
        await Firebase.usersOrderPage(bookDtl.name, bookDtl.author, url, bookDtl.price, Params.id)
        window.alert('Oreder Placed')
    }

    if (bookDtl === null && url === null) return (
        <Loading />
    )
    
  return (
    <div className=' mt-5 mx-1 flex flex-col items-center'>
        <div className='mb-1'>
            <img src={url} style={{borderRadius: '10px'}}/>
        </div>
        <div className='grid grid-flow-row gap-2'>
            <h1 className='text-3xl'>{bookDtl.name}</h1>
            <p>Book Price: ${bookDtl.price}</p>
            <p>{bookDtl.desc}</p>
            <form onSubmit={handleSubmit}>
                <div className="mt-2 flex flex-row justify-center items-center">
                    <label htmlFor="qty" className="text-xl mr-1.5 leading-6 font-bold text-gray-900">
                        Quantity: 
                    </label>
                    <input
                    id="qty"
                    name="qty"
                    type="number"
                    required
                    onChange={(e) => setQty(e.target.value)}
                    value={qty}
                    className="text-center block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-10"/>
                </div>
                <div className='text-center'>
                    <Button className='mt-2 w-fit' type='submit'>Buy Now</Button>
                </div>
            </form>
        </div> 
    </div>
  )
}

export default Details