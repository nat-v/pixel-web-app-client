import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Badge,
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

import { logout, loadUser } from '../../redux/actions/authActions';
import { getUser } from '../../redux/actions/userActions';

import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import Logout from '../auth/Logout';

const mapStateToProps = state => {
    return {
        errors: state.errors,
        auth: state.auth,
        editor: state.editor,
        grid: state.grid,
        gallery: state.gallery,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    getUser: (username) => dispatch(getUser(username)),
    loadUser: () => dispatch(loadUser())
});

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        };
    };

    toggleNavBar = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    };

    render() {
        const { isAuthenticated, isAdmin, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <h5>
                    <Badge color='warning'>
                        <NavLink className='nav-link text-dark' to='/editor'>Редактор</NavLink>
                    </Badge>
                </h5>
                <NavItem>
                    <NavLink className='nav-link' to='/gallery'>Галерея</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to='/posts'>Мої дописи</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to='/users'>Користувачі</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to='/publications'>Публікації</NavLink>
                </NavItem>
                {user ?
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {`Привіт, Natasha`}
                        </DropdownToggle>
                        <DropdownMenu right >
                            <DropdownItem>
                                <NavItem>
                                    <NavLink className='nav-link text-muted' to={`/profile/view/${user.username}`} onClick={() => this.props.getUser(user.username)}>Профіль</NavLink>
                                </NavItem>
                            </DropdownItem>
                            <DropdownItem>
                                <NavItem>
                                    <NavLink className='nav-link text-muted' to='/saved'>Збережене</NavLink>
                                </NavItem>
                            </DropdownItem>
                            <DropdownItem>
                                <NavItem>
                                    <NavLink className='nav-link text-muted' to={'/profile/update'} onClick={() => this.props.loadUser()}>Налаштування профілю</NavLink>
                                </NavItem>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                <NavItem>
                                    <Logout />
                                </NavItem>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    :
                    null
                }
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <h5>
                    <Badge color='warning'>
                        <NavLink className='nav-link text-dark' to='/editor'>Редактор</NavLink>
                    </Badge>
                </h5>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        const adminLinks = (
            <Fragment>
                <NavItem>
                    <NavLink className='nav-link' to='/admin'>Панель керування</NavLink>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar color='dark' dark expand='md'>
                    {isAdmin ?
                        <NavbarBrand href='/admin'>
                            <img className='mr-3' width='60' height='60' src='/favicon.png' alt='Logo' />Pixel Art World
                        </NavbarBrand>
                        :
                        <NavbarBrand href='/home'>
                            <img className='mr-3' width='60' height='60' src='/favicon.png' alt='Logo' />Pixel Art World
                        </NavbarBrand>
                    }
                    <NavbarToggler onClick={this.toggleNavBar} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            {isAdmin ? adminLinks : isAuthenticated && !isAdmin ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);