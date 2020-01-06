import React from 'react';

class Order extends React.Component {
  onEdit = (obj) => () => {
    this.props.onEdit(obj);
  }

  onDelete = (index) => () => {
    this.props.onDelete(index); // delete from outside;
  }

  render() {
    const { itemIndex, name, price, notes } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
        <td>{notes}</td>
        <td onClick={this.onEdit({ name, price, notes })}>edit Logo</td>
        <td onClick={this.onDelete(itemIndex)}>delete Logo</td>
      </tr>
    )
  }
}

export default Order;