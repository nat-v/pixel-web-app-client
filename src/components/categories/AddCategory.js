import React, { Component, Fragment } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { withRouter } from 'react-router-dom';

import { addCategory } from '../../redux/actions/categoryActions';

const mapStateToProps = state => {
    return {
        category: state.category
    };
};

const mapDispatchToProps = (dispatch) => ({
    addCategory: (name, miniature) => dispatch(addCategory(name, miniature))
});

class AddCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            miniature: null
        };
    }

    onChangeName = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeFile = event => {
        this.setState({
            miniature: event.target.files[0]
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name } = this.state;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.state.miniature);

        fileReader.onload = event => {
            // Attempt to add new Category
            this.props.addCategory(name, event.target.result);
        }

        this.showAlert();
    };

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row className='justify-content-center'>
                        <Col md='6'>
                            <Label for='name'>Назва категорії:</Label>
                            <Input
                                type='text'
                                name='name'
                                id='name'
                                className='mb-3'
                                onChange={this.onChangeName}
                            />
                            <Label for='miniature'>Мініатюра (зображення):</Label>
                            <Input
                                type='file'
                                id='miniature'
                                name='miniature'
                                onChange={this.onChangeFile}
                            />
                            <Button color='dark' style={{ marginTop: '2rem' }} block>
                                Додати нову категорію
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCategory));