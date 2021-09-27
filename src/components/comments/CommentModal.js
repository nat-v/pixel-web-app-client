import React, { Component, Fragment } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { addComment } from '../../redux/actions/commentActions';

const mapStateToProps = state => {
    return {
        comment: state.comment,
        auth: state.auth,
        post: state.post
    };
};

const mapDispatchToProps = (dispatch) => ({
    addComment: (author, post, text) => dispatch(addComment(author, post, text))
});

class CommentModal extends Component {

    state = {
        comment: ''
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    showAlert = () => {
        confirmAlert({
            title: 'Коментар додано',
            message: 'Ваш коментар було додано.',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {
                        this.props.history.push(`/posts/view/${this.props.post.post.chosenPost._id}`)
                    }
                }
            ]
        });
    };

    onSubmit = e => {
        e.preventDefault();

        // Attempt add comment to Post
        this.props.addComment(this.props.auth.user._id, this.props.post.chosenPost._id, this.state.comment);
        this.showAlert();
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Додати коментар</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='text'>Ваш коментар:</Label>
                                <Input
                                    type='textarea'
                                    name='comment'
                                    id='comment'
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />
                                <Button className='w-25' color='dark' style={{ marginTop: '2rem' }} block>
                                    Додати
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal);