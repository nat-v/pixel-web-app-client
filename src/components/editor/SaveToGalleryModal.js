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

import { login } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import { saveToGallery } from '../../redux/actions/imageActions';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        editor: state.editor,
        image: state.image
    };
};

const mapDispatchToProps = (dispatch) => ({
    saveToGallery: (creator, name, cols, rows, path, stage) => dispatch(saveToGallery(creator, name, cols, rows, path, stage))
});

class SaveToGalleryModal extends Component {

    state = {
        imageName: ''
    };

    showAlert = () => {
        confirmAlert({
            title: 'Збереження',
            message: 'Зображення було успішно збережено у галерею.',
            buttons: [
                {
                    label: 'Ok'
                }
            ]
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        // Attempt to save Image to Gallery
        this.props.saveToGallery(this.props.auth.user, this.state.imageName, this.props.editor.cols, this.props.editor.rows, this.props.imageURI.getStage().toDataURL({ quality: 1 }), this.props.imageURI);
        this.showAlert();
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.propstoggle}>
                    <ModalHeader toggle={this.props.toggle}>Зберегти у галерею</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='imageName'>Назва зображення:</Label>
                                <Input
                                    type='text'
                                    name='imageName'
                                    id='imageName'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button className='w-25' color='dark' style={{ marginTop: '2rem' }} block>
                                    Зберегти
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveToGalleryModal);