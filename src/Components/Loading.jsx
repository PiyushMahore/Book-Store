import React from 'react'
import 'ldrs/tailspin'

function Loading(prop) {
  return (
    <div className={`${prop} h-screen w-screen flex justify-center items-center flex-col`}>
      <l-tailspin
      size="40"
      stroke="5"
      speed="0.9"
      color="black">
      </l-tailspin>
      <p>Loading...</p>
    </div>
  )
}

export default Loading
