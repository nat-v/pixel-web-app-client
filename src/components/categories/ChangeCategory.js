import React, { Component, Fragment } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Toast,
    Alert,
    Row
} from 'reactstrap';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { withRouter } from 'react-router-dom';

import { updateCategory } from '../../redux/actions/categoryActions';
import { clearErrors } from '../../redux/actions/errorActions';

const mapStateToProps = state => {
    return {
        category: state.category,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateCategory: (id, name, miniature) => dispatch(updateCategory(id, name, miniature)),
    clearErrors: () => dispatch(clearErrors())
});

class ChangeCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            miniature: null,
            msg: null
        };
    }

    componentDidUpdate(prevProps) {
        const { errors } = this.props;

        if (errors !== prevProps.errors) {
            // Check for login error           
            if (errors.id === 'CATEGORY_ERROR') {
                this.setState({ msg: errors.msg.msg });

            } else {
                this.setState({ msg: null });
            };
        };
    };

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
        if (this.state.miniature) {
            fileReader.readAsDataURL(this.state.miniature);

            fileReader.onload = event => {
                this.props.updateCategory(this.props.category.chosenCategory._id, name, event.target.result);
            }
        } else {
            this.props.updateCategory(this.props.category.chosenCategory._id, name, this.state.miniature);
        }

        this.showAlert();
    };

    render() {
        const { chosenCategory } = this.props.category;

        return (
            <Fragment>
                {this.state.msg ? (
                    <Alert color='danger'>{this.state.msg}</Alert>
                ) : null}
                {chosenCategory ?
                    <Row className='justify-content-center'>
                        <Col md='auto' className='m-2 rounded'>
                            <Toast>
                                <img width='100%' src={chosenCategory.miniature} alt={chosenCategory.name} />
                            </Toast>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup row className='justify-content-center'>
                                    <Col>
                                        <Label for='name'>Назва категорії:</Label>
                                        <Input
                                            type='text'
                                            name='name'
                                            id='name'
                                            className='mb-3'
                                            defaultValue={chosenCategory.name}
                                            onChange={this.onChangeName}
                                            required
                                        />
                                        <Label for='miniature'>Мініатюра (зображення):</Label>
                                        <Input
                                            type='file'
                                            id='miniature'
                                            name='miniature'
                                            onChange={this.onChangeFile}
                                        />
                                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                                            Зберегти зміни
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    : null}
            </Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangeCategory));