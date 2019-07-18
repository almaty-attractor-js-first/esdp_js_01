import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                Hello, {user.displayName ? user.displayName : user.username}!
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    <NavLink
                        tag={RouterNavLink}
                        to='/orders'
                        exact
                    >
                        My Orders
                    </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserMenu;
