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
        <FormLabel component="legend">{props.legend}</FormLabel>
        <RadioGroup
          aria-label="gender"
          name={props.name}
          className={classes.group}
          value={props.value}
          onChange={props.handleChange}
        >
          <FormControlLabel
            className={classes.label}
            value={props.valueFirst}
            control={<Radio color="primary" style={{'paddingLeft': 0}}/>}
            label={props.labelFirst}
            labelPlacement={props.labelPlacement}

          />
          <FormControlLabel
            className={classes.label}
            value={props.valueSecond}
            control={<Radio color="primary"  style={{'paddingLeft': 0}}/>}
            label={props.labelSecond}
            labelPlacement={props.labelPlacement}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
