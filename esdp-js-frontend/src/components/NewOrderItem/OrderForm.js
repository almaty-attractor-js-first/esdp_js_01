import React, {Fragment, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/PlusOne';
import {getAllFields, getCleaningItems, updateOrderItems} from "../../store/actions/newOrderActions";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(1),
  },
  formControl: {
    minWidth: "100%",
  },
  bottomIcon: {
    marginTop: theme.spacing(3),
  },
  select: {
    marginTop: theme.spacing(2)
  }
}));

function OrderForm(props) {

  const classes = useStyles();

  const [orderItems, setOrderItems] = useState(props.defaultOrderItemFields);
  const handleOrderItemsChange = event => {
    const _tempOrderItems= [...orderItems];
    _tempOrderItems[event.target.dataset.id][event.target.name] = event.target.value;
    const orderItem = props.cleaningItems.find(item => {
      return item.name === _tempOrderItems[event.target.dataset.id].cleaningType
    });
    _tempOrderItems[event.target.dataset.id].price = orderItem.price;
    _tempOrderItems[event.target.dataset.id].title = orderItem.title;
    setOrderItems(_tempOrderItems);
  };


  const addNewOrderItem= () => {
    setOrderItems(prevOrderItems => [...prevOrderItems, { cleaningType: '', qty: 1, price: 0 }]);
  };

  const removeOrderItem = (i) => {
    const _tempOrderItems = [...orderItems];
    _tempOrderItems.splice(i, 1);
    setOrderItems(_tempOrderItems);
  };

  const getTotal = () => {
    props.getAllCleaningFields(orderItems);
  };

  useEffect(() => {
    props.getCleaningItems();
  }, []);

  useEffect(() => {
    getTotal();
  });

  useEffect(() => {
    props.updateOrderItems(orderItems);
  }, [orderItems]);



  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Информация о заказе
      </Typography>
      <Grid container spacing={3}>
        <Fragment>
          {orderItems.map((item, index) => (
            <Fragment key={index}>
              <Grid item xs={6} sm={7}>
                <TextField
                  select
                  className={classes.select}
                  data-id={index}
                  fullWidth
                  value={item.cleaningType}
                  onChange={handleOrderItemsChange}
                  inputProps={{
                    name: 'cleaningType',
                    id: 'cleaningType',
                    'data-id': index
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Тип чистки"
                >
                  <option value="" disabled>
                    Не выбран
                  </option>
                  {props.cleaningItems ?
                    props.cleaningItems.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>{item.title}</option>
                      )
                  }) : null}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.select}
                  data-id={index}
                  onChange={handleOrderItemsChange}
                  type="number"
                  inputProps={{
                    min: "1", max: "10", step: "1",
                    'data-id': index
                  }}
                  value={item.qty}
                  required
                  id="qty"
                  name="qty"
                  helperText="Сколько пар?"
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                {index ?
                  <IconButton size="small" className={classes.bottomIcon} color="secondary" onClick={() => removeOrderItem(index)}>
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                : null}
              </Grid>
              <Grid item xs={1}>
                <IconButton size="small" className={classes.bottomIcon} color="primary"  onClick={addNewOrderItem}>
                  <AddIcon fontSize="small"/>
                </IconButton>
              </Grid>
            </Fragment>
          ))}
        </Fragment>
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = state => {
  return {
    defaultOrderItemFields: state.newOrder.orderItems,
    cleaningItems: state.newOrder.cleaningItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCleaningFields: (arr) => dispatch(getAllFields(arr)),
    updateOrderItems: (order) => dispatch(updateOrderItems(order)),
    getCleaningItems: () => dispatch(getCleaningItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
