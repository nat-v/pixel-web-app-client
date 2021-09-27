import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Badge,
    Container,
    Toast,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ToastBody,
    ToastHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { deletePost, addToSaved } from '../../redux/actions/postActions';
import { clearErrors } from '../../redux/actions/errorActions';
import { getComments } from '../../redux/actions/commentActions';
import { getUser } from '../../redux/actions/userActions';
import CommentModal from '../comments/CommentModal';

const mapStateToProps = state => {
    return {
        post: state.post,
        auth: state.auth,
        errors: state.errors,
        comment: state.comment,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    deletePost: (id) => dispatch(deletePost(id)),
    clearErrors: () => dispatch(clearErrors()),
    getComments: (postId) => dispatch(getComments(postId)),
    addToSaved: (user, post) => dispatch(addToSaved(user, post)),
    getUser: (username) => dispatch(getUser(username))
});

class PostDetails extends Component {

    state = {
        commentModal: false
    };



    toggleCommentModal = () => {
        // Clear errors
        this.props.clearErrors();

        this.setState({
            commentModal: !this.state.commentModal
        });
    };

    saveComment = () => {
        this.setState({ commentModal: true });
    };

    delete = (id) => {
        confirmAlert({
            title: 'Видалення публікації',
            message: 'Ви впевнені, що хочете видалити цей допис? Це не вплине на зображення, що відноситься до цього допису.',
            buttons: [
                {
                    label: 'Так',
                    onClick: () => {
                        this.props.deletePost(id);
                        this.props.history.push('/posts');
                    }
                },
                {
                    label: 'Ні'
                }
            ]
        });
    };

    render() {
        const { chosenPost } = this.props.post;
        const { comments } = this.props.comment;
        const { user } = this.props.auth;
        return (
            <Container>
                {chosenPost ?
                    <Fragment>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Головна</Link>
                            </BreadcrumbItem>
                            {user._id === chosenPost._author._id ?
                                <BreadcrumbItem>
                                    <Link to='/posts'>Мої дописи</Link>
                                </BreadcrumbItem>
                                : <BreadcrumbItem>
                                    <Link to='/publications'>Публікації</Link>
                                </BreadcrumbItem>
                            }
                            <BreadcrumbItem active>Деталі допису</BreadcrumbItem>
                        </Breadcrumb>
                        <Row className='justify-content-center'>
                            <Col md='auto' className='m-2 rounded' key={chosenPost._id}>
                                <Toast>
                                    <img src={chosenPost._image.path} alt={chosenPost.name} />
                                </Toast>
                                <h3 className='text-center'>
                                    <p>{chosenPost.title}
                                    </p>
                                </h3>
                            </Col>
                            <Col md='auto'>
                                <h6>
                                    <p onClick={() => this.props.getUser(chosenPost._author.username)}>
                                        Автор публікації: <Link to={`/profile/view/${chosenPost._author.username}`}>{chosenPost._author.username}</Link>
                                    </p>
                                </h6>
                                <h4>
                                    <p>
                                        {chosenPost.description}
                                    </p>
                                </h4>
                                <h4>
                                    Категорія:
                                    <Badge className='m-1'>{chosenPost._category.name}</Badge>
                                </h4>
                                <p>Створено: {new Intl.DateTimeFormat('uk-UK', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(chosenPost.createdAt)))}</p>
                                {!comments ?
                                    <p>У цієї публікації ще немає коментарів :(</p> :
                                    comments.map((comment, i) => (
                                        <Toast>
                                            <ToastHeader icon="secondary" onClick={() => this.props.getUser(comment._author.username)}>
                                                <Link to={`/profile/view/${comment._author.username}`}>{comment._author.username}</Link>
                                            </ToastHeader>
                                            <ToastBody>
                                                {comment.text}
                                            </ToastBody>
                                        </Toast>
                                    ))
                                }
                                {chosenPost._author._id == this.props.auth.user._id ?
                                    <div>
                                        <h4>
                                            <Link to={`/posts/update/${chosenPost._id}`}>
                                                <Badge>Редагувати</Badge>
                                            </Link>
                                        </h4>
                                        <h4>
                                            <Link>
                                                <Badge onClick={() => this.delete(chosenPost._id)} color='danger'>Видалити</Badge>
                                            </Link>
                                        </h4>
                                    </div> :
                                    <div>
                                        <h4>
                                            <Link>
                                                <Badge onClick={this.saveComment}>Додати коментар</Badge>
                                            </Link>
                                            <CommentModal isOpen={this.state.commentModal} toggle={this.toggleCommentModal} />
                                        </h4>
                                        <Button onClick={() => this.props.addToSaved(this.props.auth.user._id, chosenPost._id)}>
                                            <span className="fa fa-save fa-lg"></span>
                                        </Button>
                                    </div>}
                            </Col>
                        </Row>
                    </Fragment>
                    : null
                }

            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);