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
    border: '1px solid #888',
    width: '40%',
    position: 'relative',
    borderRadius: 12,
    paddingBottom: 20,
  },
  modalHeader: {
    display: 'flex',
    backgroundColor: 'rgb(35, 73, 118)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    paddingLeft: 32,
    color: '#fff',
  },
  modalBody: {
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
    display: 'flex',
    flexDirection: 'column',
  },
  modalFooter: {
    marginTop: 24,
    paddingRight: 32,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  inRowClass: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    alignItems: 'flex-start',
  },
  textInput: {
    flexGrow: 1,
    marginLeft: 16,
  },
  textArea: {
    marginLeft: 16,
    flexGrow: 1,
    height: 60,
    resize: 'none',
  },
  divier: {
    flexGrow: 1,
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
  cancelClass: {
    margin: 4,
    width: 40,
    height: 28,
    lineHeight: '28px',
    color: '#fff',
    backgroundColor: 'rgb(203, 68, 75)',
    '&:hover': {
      backgroundColor: 'rgb(203, 68, 75, 0.8)'
    },
  },
  confirmClass: {
    margin: 4,
    width: 40,
    height: 28,
    lineHeight: '28px',
    color: '#fff',
    marginRight: 0,
    backgroundColor: 'rgb(83, 164, 81)',
    '&:hover': {
      backgroundColor: 'rgb(83, 164, 81, 0.8)'
    },
  },
  modalCloseClass: {
    position: 'absolute',
    top: 4,
    right: 8,
  }
})


const OrderModal = (props) => {
  const { isEditMode, data = {}, onEditOrder, onAddOrder } = props;
  const classes = useStyles();
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [notes, setNotes] = useState(data.notes);
  const [modelVisible, setModelVisible] = useState(false);
  const onClickClose = () => setModelVisible(false);
  const onClickOpen = () => setModelVisible(true);
  const onClickCancel = onClickClose;
  const onClickConfirm = () => {
    if (isEditMode) {
      onEditOrder({
        name,
        price,
        notes,
      })
    } else {
      onAddOrder({
        name,
        price,
        notes,
      })
    }
    
    onClickClose();
  }
  const onChangeName = (e) => setName(e.target.value);
  const onChangePrice = (e) => setPrice(e.target.value);
  const onChangeNotes = (e) => setNotes(e.target.value);
  return (
    <div>
      <div className={classes.btn} onClick={onClickOpen}>{isEditMode ? <i className="fa fa-edit" /> : <i className="fa fa-plus" />}</div>
      {modelVisible &&
        <div className={classes.modalStyle} onClick={onClickClose}>
          <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={`${classes.btn} ${classes.modalCloseClass}`} onClick={onClickClose}>
              <i className="fa fa-close" />
            </div>        
            <div className={classes.modalHeader}>
              <h3>{`${isEditMode ? '編輯' : '新增'}訂單`}</h3>
              <div className={classes.divier} />
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
              <div className={classes.inRowClass}>
                <h5 className={classes.h5}>備註:</h5>
                <textarea value={notes} onChange={onChangeNotes} className={classes.textArea}/>
              </div>
            </div>
            <div className={classes.modalFooter}>
              <div className={`${classes.btn} ${classes.cancelClass}`} onClick={onClickCancel}>取消</div>
              <div className={`${classes.btn} ${classes.confirmClass}`} onClick={onClickConfirm}>確認</div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default OrderModal;