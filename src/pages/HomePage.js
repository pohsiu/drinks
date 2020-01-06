import React, { useState } from 'react';
import OrderModal from '../components/OrderModal';

const samples = [
  {
    name: '奶茶', // string
    price: 40, // number
    notes: '大杯\n無糖\n去冰\n' // optional string
  },
  {
    name: '紅茶', // string
    price: 30, // number
    notes: '中杯 無糖 常溫' // optional string
  }
]



const HomePage = (props) => {
  const [orders, setOrders] = useState(samples);
  const onDelete = (orderIndex) => () => {
    orders.splice(orderIndex, 1);
    setOrders([...orders]);
  };
  const onEditOrder = (orderIndex) => (data) => {
    orders[orderIndex] = data;
    setOrders([...orders]);
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>品項</th>
            <th>價錢</th>
            <th>備註</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
        {orders.map((order, index) => {
          return (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.notes || '無'}</td>
              <td><OrderModal isEditMode data={order} onEditOrder={onEditOrder(index)}/></td>
              <td onClick={onDelete(index)}>delete Logo</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default HomePage;