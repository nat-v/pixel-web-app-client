import React, { Component, Fragment, useState } from 'react';
import {
    Button,
    Row,
    Col,
    Card,
    Collapse,
    NavbarToggler,
    Nav,
    Navbar,
    CardTitle,
    CardText
} from 'reactstrap';

const ProfileSidebar = (props) => {

    return (
        <Fragment className='sidebar'>
            <Navbar className='mt-3' color='faded' expand='md'>
                <NavbarToggler />
                <Collapse navbar>
                    <Card body inverse color='dark'>
                        <CardTitle>
                            <strong>Налаштування профілю</strong>
                        </CardTitle>
                        <CardText>
                            <Nav vertical navbar>
                                <Button href={'/profile/update'} color='light' outline style={{ marginTop: '1rem' }}>
                                    Змінити
                                </Button>
                            </Nav>
                        </CardText>
                    </Card>
                </Collapse>
            </Navbar>
            <Navbar color='faded' expand='md'>
                <NavbarToggler />
                <Collapse navbar>
                    <Card body inverse color='dark'>
                        <CardTitle>
                            <strong>Налаштування безпеки</strong>
                        </CardTitle>
                        <CardText>
                            <Nav vertical navbar>
                                <Button href={'/profile/changePassword'} color='light' outline style={{ marginTop: '1rem' }}>
                                    Змінити пароль
                                </Button>
                            </Nav>
                        </CardText>
                    </Card>
                </Collapse>
            </Navbar>
        </Fragment>
    );

}

export default ProfileSidebar;