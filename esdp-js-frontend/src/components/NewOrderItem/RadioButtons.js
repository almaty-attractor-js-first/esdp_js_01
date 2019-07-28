import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formControl: {
    margin: theme.spacing(2),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  label: {
    margin: theme.spacing(0),
  },
}));

export default function RadioButtonsGroup(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Способ оплаты</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender2"
          className={classes.group}
          value={props.paymentMethod}
          onChange={props.handleChangePaymentMethod}
        >
          <FormControlLabel
            className={classes.label}
            value="cash"
            control={<Radio color="primary" />}
            label="Наличными"
            labelPlacement="start"
          />
          <FormControlLabel
            className={classes.label}
            value="epay"
            control={<Radio color="primary" />}
            label="Онлайн"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
