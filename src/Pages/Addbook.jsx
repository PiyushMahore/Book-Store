import React, { useState } from 'react'
import { useFirebase } from '../Context/FirebaseContext'
import { IoBookSharp } from "react-icons/io5"
import { NavLink } from 'react-router-dom'
import { Button } from "@material-tailwind/react"

function Addbook() {
    const [book, setBook] = useState("")
    const [price, setPrice] = useState("")
    const [isbnNumber, setIsbnNumber] = useState("")
    const [coverPic, setCoverPic] = useState("")
    const [author, setAuthore] = useState("")
    const [description, setDescription] = useState("")

    const Firebase = useFirebase()

    const handleSubmit = (e) => {
        e.preventDefault()
        Firebase.addNewListing(book, isbnNumber, price, coverPic, author, description)
    }

    if(!Firebase.user) return (
      <div className='text-center'>
        <p className='text-3xl text-white mt-4'>Please Login to Add Books </p>
        <Button className='mt-1 bg-blue-900'><NavLink to='/login'>Login</NavLink></Button>
      </div>
    )

  return (
    <div>
         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='flex justify-center mb-2'>
          <IoBookSharp size={45} />
          </div>
          <form className="space-y-6 mx-2 text-center" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="book" className="block text-sm font-medium leading-6 text-gray-900">
                Book Name
              </label>
              <div className="mt-2">
                <input
                  id="book"
                  name="book"
                  type="text"
                  required
                  onChange={(e) => setBook(e.target.value)}
                  value={book}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="coverPic" className="block text-sm font-medium leading-6 text-gray-900">
                Author Name
              </label>
              <div className="mt-2">
                <input
                  id="coverPic"
                  name="coverPic"
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthore(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="isbnNumber" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <input
                  id="isbnNumber"
                  name="isbnNumber"
                  type="text"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="isbnNumber" className="block text-sm font-medium leading-6 text-gray-900">
                ISBN
              </label>
              <div className="mt-2">
                <input
                  id="isbnNumber"
                  name="isbnNumber"
                  type="number"
                  required
                  onChange={(e) => setIsbnNumber(e.target.value)}
                  value={isbnNumber}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="coverPic" className="block text-sm font-medium leading-6 text-gray-900">
                Cover Pic
              </label>
              <div className="mt-2">
                <input
                  id="coverPic"
                  name="coverPic"
                  type="file"
                  required
                  onChange={(e) => setCoverPic(e.target.files[0])}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Addbook