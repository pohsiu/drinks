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
    padding: '25px 40px',
    border: '1px solid #888',
    width: '40%',
  },
  modalHeader: {
    display: 'flex',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalFooter: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  inRowClass: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    alignItems: 'flex-start',
  },
  textInput: {
    width: '25vw',
    marginLeft: 16,
  },
  textArea: {
    marginLeft: 16,
    width: '25vw',
    height: 60,
    resize: 'none',
  },
  divier: {
    flexGrow: 1,
  },
  btn: {
    width: 40,
    height: 28,
    lineHeight: '28px',
    padding: '4px 4px',
    cursor: 'pointer',
    border: '#000 1px solid',
    textAlign: 'center',
    margin: 4,
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
  const { isEditMode, data, onEditOrder } = props;
  const classes = useStyles();
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [notes, setNotes] = useState(data.notes);
  const [modelVisible, setModelVisible] = useState(false);
  const onClickClose = () => setModelVisible(false);
  const onClickOpen = () => setModelVisible(true);
  const onClickCancel = onClickClose;
  const onClickConfirm = () => {
    onEditOrder({
      name,
      price,
      notes,
    })
    onClickClose();
  }
  const onChangeName = (e) => setName(e.target.value);
  const onChangePrice = (e) => setPrice(e.target.value);
  const onChangeNotes = (e) => setNotes(e.target.value);
  return (
    <div>
      <button onClick={onClickOpen}>{isEditMode ? 'Edit' : 'Add'}</button>

      {modelVisible && isEditMode &&
        <div className={classes.modalStyle} onClick={onClickClose}>
          <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>          
            <div className={classes.modalHeader}>
              <h3>{`${isEditMode ? '編輯' : '新增'}訂單`}</h3>
              <div className={classes.divier} />
              <span type="button" className={classes.closeBtn} onClick={onClickClose}>
                &times;
              </span>
            </div>
            <div className={classes.modalBody}>
              <div className={classes.inRowClass}>
                <h5 className={classes.h5}>品項:</h5>
                <input type='text' value={name} onChange={onChangeName} className={classes.textInput}/>
              </div>
              <div className={classes.inRowClass}>
                <h5 className={classes.h5}>金額:</h5>
                <input required type='number' step="5" min="0" value={price} onChange={onChangePrice} className={classes.textInput}/>
              </div>
              <div></div>
              <div className={classes.inRowClass}>
                <h5 className={classes.h5}>備註:</h5>
                <textarea value={notes} onChange={onChangeNotes} className={classes.textArea}/>
              </div>
              <div></div>
            </div>
            <div className={classes.modalFooter}>
              <div className={classes.btn} onClick={onClickCancel}>取消</div>
              <div className={classes.btn} onClick={onClickConfirm}>確認</div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default OrderModal;