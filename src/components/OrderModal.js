import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  modalStyle: {
    display: 'block',
    position: 'fixed',
    zIndex: 1,
    paddingTop: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    margin: 'auto',
    padding: 20,
    border: '1px solid #888',
    width: '80%',
  },
  closeBtn: {
    color: '#aaaaaa',
    float: 'right',
    fontSize: 28,
    fontWeight: 'bold',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
      cursor: 'pointer',
    }
  }
})

const OrderModal = (props) => {
  const { isEditMode } = props;
  const classes = useStyles();
  const [modelVisible, setModelVisible] = useState(false);
  const onClickClose = () => setModelVisible(false);
  const onClickOpen = () => setModelVisible(true);
  return (
    <div>
      <button id="myBtn" onClick={onClickOpen}>{isEditMode ? 'Edit' : 'Add'}</button>

      {modelVisible && 
        <div id="myModal" className={classes.modalStyle} onClick={onClickClose}>
          <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={classes.closeBtn} onClick={onClickClose}>&times;</span>
            <p>Some text in the Modal..</p>
          </div>
        </div>
      }
    </div>
  )
}

export default OrderModal;