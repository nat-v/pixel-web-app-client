import React, { Component } from 'react';
import {
    Card,
    Jumbotron,
    CardBody,
    CardTitle,
    Row,
    Col,
    Container,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    CardImg,
    Toast,
    ToastBody,
    ToastHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadUsers, getUser } from '../../redux/actions/userActions';

import bgimage from '../../images/bgImage.jpg'

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadUsers: () => dispatch(loadUsers()),
    getUser: (username) => dispatch(getUser(username))
});

class UsersList extends Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>Користувачі</h1>
                </Jumbotron>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Головна</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Користувачі</BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    {this.props.user.users.map((user) =>
                        <Col md='3' className='mb-3 my-1 rounded' key={user._id}>
                            <Toast body>
                                <img width='100%' height='250' src={user.profilePic} alt={user.username} />
                                <ToastBody>
                                    <ToastHeader><h5>{user.username}</h5></ToastHeader>
                                    <Link to={`/profile/view/${user.username}`}>
                                        <h4>
                                            <Badge onClick={() => this.props.getUser(user.username)} color='secondary'>Переглянути профіль</Badge>
                                        </h4>
                                    </Link>
                                </ToastBody>
                            </Toast>
                        </Col>
                    )}
                </Row>
            </Container >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);