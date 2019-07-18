import React, {Fragment} from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <Fragment>
            <NavItem>
                <NavLink
                    tag={RouterNavLink}
                    to='/register'
                    exact
                >
                    Sign up
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    tag={RouterNavLink}
                    to='/login'
                    exact
                >
                    Login
                </NavLink>
            </NavItem>
        </Fragment>
    );
};

export default AnonymousMenu;
