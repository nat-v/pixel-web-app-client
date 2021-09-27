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

const mapStateToProps = state => {
    return {
        post: state.post
    };
};

class PostsInCategory extends Component {

    render() {
        return (
            <Container>
                <Row>
                    {this.props.post.posts.map((post) =>
                        <Col md='3' className='mb-3 my-1 rounded' key={post._id}>
                            <Toast body>
                                <img width='100%' height='250' src={post._image.path} alt={post.name} />
                                <ToastHeader><h5>{post.title}</h5></ToastHeader>
                                <ToastBody>
                                    <h6>
                                        <p>Автор публікації: {post._author.username}</p>
                                    </h6>
                                </ToastBody>
                            </Toast>
                        </Col>
                    )}
                </Row>
            </Container >
        );
    }
}

export default connect(mapStateToProps)(PostsInCategory);