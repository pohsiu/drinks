import React, { useState, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

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
  validErrorClass: {
    border: '1px solid red',
    animation: 'shake 0.08s 2',
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
  },
  h5: {
    color: '#000',
  },
  errh5: {
    color: 'grey',
    fontStyle: 'oblique',
    textAlign: 'end',
  }
})


const OrderModal = (props) => {
  const { isEditMode, data = {}, onEditOrder, onAddOrder } = props;
  const classes = useStyles();
  const [name, setName] = useState(data.name || '');
  const [price, setPrice] = useState(data.price || '');
  const [notes, setNotes] = useState(data.notes || '');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [modelVisible, setModelVisible] = useState(false);
  const onClickClose = useCallback(() => setModelVisible(false), [setModelVisible]);
  const onClickOpen = useCallback(() => {
    setModelVisible(true);
    setNotes(data.notes);
    setName(data.name);
    setPrice(data.price);
    setIsPriceValid(true);
    setIsNameValid(true);
  }, [setModelVisible, setPrice, setName, setNotes, data, setIsNameValid, setIsPriceValid]);
  const onClickCancel = onClickClose;
  const onClickConfirm = useCallback(() => {
    if (isEditMode) {
      onEditOrder({
        name,
        price,
        notes,
      })
    } else {
      let isValid = true;
      if (!name) { setIsNameValid(false);  isValid = false; }
      if (!price) { setIsPriceValid(false); isValid = false; }
      if (!isValid) return;
      onAddOrder({
        name,
        price,
        notes,
      })
    }
    
    onClickClose();
  }, [isEditMode, onEditOrder, onAddOrder, onClickClose, name, price, notes, setIsPriceValid, setIsNameValid]);
  const onChangeName = useCallback((e) => {
    if (e.target.value) setIsNameValid(true);
    setName(e.target.value)
  }, [setName, setIsNameValid]);
  const onChangePrice = useCallback((e) => {
    if (e.target.value) setIsPriceValid(true);
    setPrice(e.target.value);
  }, [setIsPriceValid, setPrice]);
  const onChangeNotes = useCallback((e) => setNotes(e.target.value), []);
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
                <input type='text' value={name} onChange={onChangeName} className={clsx(classes.textInput, { [classes.validErrorClass]: !isNameValid })}/>
              </div>
              {!isNameValid && <h5 className={classes.errh5}>請輸入品項</h5>}
              <div className={classes.inRowClass}>
                <h5 className={classes.h5}>金額:</h5>
                <input required type='number' step="5" min="0" value={price} onChange={onChangePrice} className={clsx(classes.textInput, { [classes.validErrorClass]: !isPriceValid })}/>
              </div>
              {!isPriceValid && <h5 className={classes.errh5}>請輸入金額</h5>}
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