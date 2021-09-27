import React, { Component } from 'react';
import {
    Card,
    Jumbotron,
    CardBody,
    CardTitle,
    Row,
    Col,
    Container,
    CardSubtitle,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    ToastHeader,
    Toast,
    ToastBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadSaved, getPost } from '../../redux/actions/postActions';
import { getUser } from '../../redux/actions/userActions';

import bgimage from '../../images/bgImage.jpg'

const mapStateToProps = state => {
    return {
        post: state.post,
        auth: state.auth,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadSaved: (id) => dispatch(loadSaved(id)),
    getUser: (username) => dispatch(getUser(username)),
    getPost: (id) => dispatch(getPost(id))
});

class ViewPosts extends Component {

    componentDidMount() {
        this.props.loadSaved(this.props.auth.user._id);
    };

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>Збережені публікації</h1>
                </Jumbotron>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Головна</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Збережене</BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    {this.props.post.posts.map((post) =>
                        <Col md='3' className='mb-3 my-1 rounded' key={post._id}>
                            <Toast body>
                                <img width='100%' height='250' src={post._image.path} alt={post.name} />
                                <ToastHeader><h5>{post.title}</h5></ToastHeader>
                                <ToastBody>
                                    <h6>
                                        <p onClick={() => this.props.getUser(post._author.username)}>
                                            Автор публікації: <Link to={`/profile/view/${post._author.username}`}>{post._author.username}</Link>
                                        </p>
                                    </h6>
                                    <Link to={`/posts/view/${post._id}`}>
                                        <h4>
                                            <Badge onClick={() => this.props.getPost(post._id)} color='secondary'>Переглянути</Badge>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewPosts);