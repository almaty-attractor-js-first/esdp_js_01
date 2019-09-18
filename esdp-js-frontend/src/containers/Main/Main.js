import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Image from '../../assets/images/bgmain.jpg'
import FormDialog from "../../components/UI/FormDialog";

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '75vh',
        padding: 'auto',
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
        <Fragment>
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
                <FormDialog open={open} handleClose={handleClose}/>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        user: state.users.user
    };
};

export default connect(mapStateToProps, null)(Main);
