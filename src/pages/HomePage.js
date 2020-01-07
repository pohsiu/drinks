import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
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
    notes: '中杯\n無糖\n常溫' // optional string
  },
  {
    name: '珍奶', // string
    price: 50, // number
    notes: '中杯\n無糖\n常溫' // optional string
  }
]

const useStyles = createUseStyles({
  root: {
    width: '60vw',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 20,
    height: 20,
    padding: '4px 4px',
    textAlign: 'center',
    borderRadius: 6,
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(3px)',
    },
    margin: 'auto',
  },
  theader: {
    backgroundColor: 'rgb(35, 73, 118)',
    color: '#fff',
    height: 40,
    borderBottom: '1px solid white',
  },
  table: {
    borderCollapse: 'collapse',
  },
  tr: {
    borderBottom: '2px solid white',
    paddingTop: 12,
    paddingBottom: 12,
  },
  trOdd: {
    backgroundColor: 'grey',
    color: 'white',
    borderBottom: '2px solid black',
  },
  td: {
    padding: 2,
    wordWrap: 'break-word',
    whiteSpace: 'pre-line',
    textAlign: 'center',
    minWidth: '10vw',
  },
  divider: {
    backgroundColor: 'rgb(35, 73, 118)',
    height: 2,
    marginBottom: 20,
  }
})

const StyleTd = (props) => {
  const classes = useStyles();
  const { children, ...others } = props;
  return <td className={classes.td} {...others}>{children}</td>
}

const HomePage = (props) => {
  const [orders, setOrders] = useState(samples);
  const classes = useStyles();
  const onDelete = (orderIndex) => () => {
    orders.splice(orderIndex, 1);
    setOrders([...orders]);
  };
  const onEditOrder = (orderIndex) => (data) => {
    orders[orderIndex] = data;
    setOrders([...orders]);
  }
  const onAddOrder = (data) => {
    orders.push(data);
    setOrders([...orders]);
  }
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h4>訂飲料</h4>
        <OrderModal onAddOrder={onAddOrder} />
      </div>
      <div className={classes.divider}/>
      {orders.length === 0 && <h4>尚無任何訂單，請新增訂單</h4>}
      {orders.length > 0 && <table className={classes.table}>
        <thead>
          <tr className={classes.theader}>
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
            <tr className={index % 2 === 0 ? classes.trOdd : classes.tr} key={index}>
              <StyleTd>{order.name}</StyleTd>
              <StyleTd>{order.price}</StyleTd>
              <StyleTd>{order.notes || '無'}</StyleTd>
              <StyleTd><OrderModal isEditMode data={order} onEditOrder={onEditOrder(index)}/></StyleTd>
              <StyleTd><div className={classes.btn} onClick={onDelete(index)}><i className="fa fa-trash" /></div></StyleTd>
            </tr>
          )
        })}
        </tbody>
      </table>}
    </div>
  )
}

export default HomePage;