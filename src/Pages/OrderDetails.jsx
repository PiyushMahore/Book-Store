import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/FirebaseContext'
import { useParams } from 'react-router-dom'

function OrderDetails() {
    const [orders, setOrders] = useState('')
    const Params = useParams()
    const Firebase = useFirebase()
    useEffect(() => {
        Firebase.getOrderDetail(Params.id).then((res) => setOrders(res.docs))
    }, [Firebase])

  return (
    <div>
        <h1 className='text-4xl'>Orders</h1>
        {orders && orders.map((order) => {
            const data = order.data()
            return (
                <div className='mt-5 ml-1 p-2 border bottom-1 border-gray-600 w-fit' key={order.id}>
                    <p>{data.NameOfProduct}</p>
                    <p>Ordered by: {data.OrderdBy}</p>
                    <p>Quntity: {data.Quantity}</p>
                    <p>Email: {data.userEmail}</p>
                    <p>Order Status: {data.orderStatus}</p>
                    <button onClick={() => Firebase.UpdateOrderStatus(Params.id, order.id, "Accept")} className={`${data.orderStatus == "Accept" || data.orderStatus == "Rejact" ? "hidden" : "text-black"} mr-3 px-2 py-0.5 rounded-lg bg-green-500`}>Accept</button>
                    <button onClick={() => Firebase.UpdateOrderStatus(Params.id, order.id, "Rejacted")} className={`${data.orderStatus == "Accept" || data.orderStatus == "Rejact" ? "hidden" : "text-black"} bg-red-500 px-2 py-0.5 rounded-lg`}>Rejact</button>
                </div>
            )
        })}
    </div>
  )
}

export default OrderDetails
