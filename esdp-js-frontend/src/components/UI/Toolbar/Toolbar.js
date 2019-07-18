import React, {Fragment} from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {
    Container, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";

const Toolbar = ({user, logout}) => {
    return (
        <Navbar color="dark" dark className="mb-3">
            <Container>
                <NavbarBrand
                    tag={RouterNavLink}
                    to='/'
                    exact
                >
                    Sneakers cleaning
                </NavbarBrand>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink
                            tag={RouterNavLink}
                            to='/'
                            exact
                        >
                            Главная
                        </NavLink>
                    </NavItem>
                    {
                        user
                            ?
                            <UserMenu
                                user={user}
                                logout={logout}
                            />
                            :
                            <AnonymousMenu />
                    }

                </Nav>
            </Container>
        </Navbar>
    );
};

export default Toolbar;
