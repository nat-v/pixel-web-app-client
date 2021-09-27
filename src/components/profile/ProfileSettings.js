import React, { Component, Fragment } from 'react';
import {
    Container,
    Toast,
    ToastHeader,
    ToastBody,
    Row,
    Col,
    Badge,
    Card,
    CardImg,
    Label,
    Input,
    CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export class ProfileSettings extends Component {
    render() {
        const { user } = this.props.auth;
        return (
            <Container fluid>
                {user ?
                    <Row>
                        <Col sm='12' md='4' lg='3'>
                            <ProfileSidebar user={user} />
                        </Col>
                        <Col sm='12' md='8' lg='6'>
                            {this.props.profileSettings}
                        </Col>
                    </Row>
                    : null}
            </Container >
        );
    }
}

export default withRouter(connect(mapStateToProps)(ProfileSettings));