import React, { useState } from 'react';
import OrderModal from '../components/OrderModal';

const samples = [
  {
    name: 'n1', // string
    price: 40, // number
    notes: '' // optional string
  }
]



const HomePage = (props) => {
  const [orders, setOrders] = useState(samples);
  const onDelete = (key) => () => {};
  const onEditOrder = (key) => (data) => {
    orders[key] = data;
    setOrders([...orders]);
  }
  return (
    <div>
      <table>
        <tr>
          <th>品項</th>
          <th>價錢</th>
          <th>備註</th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
        {orders.map(({ name, price, notes}, index) => {
          return (
            <tr>
              <td>{name}</td>
              <td>{price}</td>
              <td>{notes}</td>
              <td><OrderModal isEditMode onEditOrder={onEditOrder(index)}/></td>
              <td onClick={onDelete(index)}>delete Logo</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default HomePage;