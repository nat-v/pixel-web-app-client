import React, { Component, Fragment } from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import { connect } from 'react-redux';
import AdminSidebar from './AdminSidebar';

export class AdminDashboard extends Component {
    render() {
        return (

            <Row>
                <Col sm='12' md='4' lg='3'>
                    <AdminSidebar />
                </Col>
                <Col sm='12' md='8' lg='6'>
                    {this.props.adminPanel}
                </Col>
            </Row>

        );
    }
}

export default (AdminDashboard);