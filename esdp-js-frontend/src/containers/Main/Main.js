import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Image from '../../assets/images/bgmain.jpg'

const styles = theme => ({
    main: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `url(${Image})`,
        height: '700px',
        padding: 'auto',
        color: 'white'
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    text: {
        color: theme.palette.text.primary,
    },
});

class Main extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div className={classes.main}>
                    <h1>
                        Самая быстрая химчистка кроссовок в городе
                    </h1>
                    <h3>Закажи химчистку прямо сейчас</h3>
                    <Button component={Link}
                            to="/new-order"
                            color="primary"
                            variant="contained"
                            className={classes.submit}
                    >
                        Оформить заказ на чистку
                    </Button>
                </div>
            </Fragment>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.users.user
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Main));
