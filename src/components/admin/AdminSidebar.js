import React, { Component, Fragment, useState } from 'react';
import {
    Button,
    Card,
    Collapse,
    NavbarToggler,
    Nav,
    Navbar,
    CardTitle,
    CardText,
    NavbarBrand,
    NavItem,
    NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

const AdminSidebar = (props) => {

    const [collapsed, setCollapsed] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <Fragment className='sidebar'>
            <Navbar color='dark' dark>
                <NavbarBrand href="/admin" className="mr-auto">
                    <span className="fa fa-home fa-lg m-2"></span>
                    Адмін панель
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav vertical navbar>
                        <NavItem>
                            <h5>
                                <Link to='/admin/category/view'>
                                    <NavLink color='light' outline style={{ marginTop: '1rem' }}>
                                        <span className="fa fa-tags fa-lg m-2"></span>
                               Категорії
                                </NavLink>
                                </Link>
                            </h5>
                        </NavItem>
                        <NavItem>
                            <h5>
                                <Link to='/admin/publication/view'>
                                    <NavLink color='light' outline style={{ marginTop: '1rem' }}>
                                        <span className="fa fa-image fa-lg m-2"></span>
                                Публікації
                                </NavLink>
                                </Link>
                            </h5>
                        </NavItem>
                        <NavItem>
                            <h5>
                                <Link to='/admin/comment/view'>
                                    <NavLink color='light' outline style={{ marginTop: '1rem' }}>
                                        <span className="fa fa-comments fa-lg m-2"></span>
                                    Коментарі
                                    </NavLink>
                                </Link>
                            </h5>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </Fragment>
    );

}

export default AdminSidebar;