import React, {Component, Fragment} from 'react';
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import './Main.css';

class Main extends Component {
    render() {
        return (
            <Fragment>
                <div className="Main d-flex justify-content-center align-items-center flex-column">
                    <h1>
                        Самая быстрая химчистка кроссовок в городе
                    </h1>
                    <h3>Закажи химчистку прямо сейчас</h3>
                    <Button tag={Link}
                            to="/neworder"
                            color="primary"
                    >
                        Оформить заказ на чистку
                    </Button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user
    };
};

export default connect(mapStateToProps, null)(Main);
