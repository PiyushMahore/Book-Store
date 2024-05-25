import React, { useState } from 'react'
import { useFirebase } from '../Context/FirebaseContext'
import { useEffect } from 'react'
import Cards from '../Components/Cards'
import Loading from '../Components/Loading'
import { Navigate } from 'react-router-dom'

function Home() {
    const Firebase = useFirebase()
    const [books, setBooks] = useState()
    
    useEffect(() => {
        Firebase.getBooks((book) => {
          setBooks(book)
        })
    }, [Firebase])

    if(books === null) return (
      <Loading />
    )

    if(!Firebase.user) return (
      <Navigate to="/login" />
    )

  return (
    <div className='grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
        {books && books.map((book) => (
            <Cards key={book.id} link={`/book/view/${book.id}`} id={book.id} {...book.data()} />
        ))}
    </div>
  )
}

export default Home
