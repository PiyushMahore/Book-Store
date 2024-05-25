import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/FirebaseContext'
import Cards from '../Components/Cards'
import UsersOrder from './UsersOrder'

function Orders() {
    const [AdminBooks, setAdminBooks] = useState(null)
    const [userBooks, setUserBooks] = useState(null)
    const Firebase = useFirebase()

    useEffect(() => {
        if(Firebase.isLogedIn) {
            Firebase.fetchBook(Firebase.user.uid).then((books) => setAdminBooks(books.docs))
        }
    }, [Firebase])

    useEffect(() => {
        if(Firebase.isLogedIn) {
            Firebase.getUserOrders().then((res) => setUserBooks(res.docs))
        }
    }, [Firebase])

  return (
    <div className='grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
        {AdminBooks && AdminBooks.map((book) => (
            <Cards key={book.id} link={`/book/orders/${book.id}`} id={book.id} {...book.data()} />
        ))}
        {userBooks && userBooks.map((book) => (
            <UsersOrder key={book.id} link={`/book/view/${book.data().pageId}`} id={book.id} {...book.data()}/>
        ))}
    </div>
  )
}

export default Orders
