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
    ToastBody,
    ButtonToolbar,
    ButtonGroup,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadAllPosts, getPost, loadPostsInCategory } from '../../redux/actions/postActions';
import { getComments } from '../../redux/actions/commentActions';
import { loadCategories } from '../../redux/actions/categoryActions';
import { getUser } from '../../redux/actions/userActions';

import bgimage from '../../images/bgImage.jpg'

const mapStateToProps = state => {
    return {
        post: state.post,
        comment: state.comment,
        category: state.category,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadAllPosts: () => dispatch(loadAllPosts()),
    loadCategories: () => dispatch(loadCategories()),
    loadPostsInCategory: (id) => dispatch(loadPostsInCategory(id)),
    getPost: (id) => dispatch(getPost(id)),
    getComments: (id) => dispatch(getComments(id)),
    getUser: (username) => dispatch(getUser(username))
});

class Publications extends Component {

    componentDidMount() {
        this.props.loadAllPosts();
        this.props.loadCategories();
    };

    loadPostView = (id) => {
        this.props.getPost(id);
        this.props.getComments(id);
    };

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>Публікації</h1>
                </Jumbotron>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Головна</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Публікації</BreadcrumbItem>
                </Breadcrumb>
                <ButtonToolbar>
                    <ButtonGroup size="lg">
                        {this.props.category.categories.map((category) =>
                            <Button onClick={() => this.props.loadPostsInCategory(category._id)}>
                                <img width='100' src={category.miniature} alt={category.name} />
                                {category.name}
                            </Button>
                        )}
                        <Button onClick={() => this.props.loadAllPosts()}>Всі</Button>
                    </ButtonGroup>
                </ButtonToolbar>
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
                                            <Badge onClick={() => this.loadPostView(post._id)} color='secondary'>Переглянути</Badge>
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

export default connect(mapStateToProps, mapDispatchToProps)(Publications);