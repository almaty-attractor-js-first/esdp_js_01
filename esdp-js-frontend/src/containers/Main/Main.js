import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Image from '../../assets/images/bgmain.jpg'
import FormDialog from "../../components/UI/FormDialog";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
        padding: '8px',
        textAlign: 'center',
        color: 'white'
    },
    submit: {
        margin: theme.spacing(1)
    },
    text: {
        color: theme.palette.text.primary,
    },
    textShadow: {
        textShadow: '0 2px 5px #000'
    },
    background: {
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: 6,
        boxShadow: '2px 5px 9px 2px rgba(0, 0, 0, 0.63)'
    }
}));

const Main = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    return (
        <Grid container className={classes.background}>
            <Grid item md={12} xs={12}>
                <div className={classes.main}>
                    <h1 className={classes.textShadow}>
                        Самая быстрая химчистка кроссовок в городе
                    </h1>
                    <h3 className={classes.textShadow}>Закажи химчистку прямо сейчас</h3>
                    <Button component={Link}
                            to="/new-order"
                            color="default"
                            variant="contained"
                            className={classes.submit}
                    >
                        Оформить заказ на чистку
                    </Button>
                    <Button color="primary"
                            variant="contained"
                            className={classes.submit}
                            onClick={handleClickOpen}
                    >
                        Проверить статус заказа
                    </Button>
                </div>
                <FormDialog open={open} handleClose={handleClose}/>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => {
    return {
        user: state.users.user
    };
};

export default connect(mapStateToProps, null)(Main);
