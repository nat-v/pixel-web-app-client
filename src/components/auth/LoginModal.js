import React, { Component, Fragment } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';

import { login } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

const mapStateToProps = state => {
    return {
        errors: state.errors,
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => ({
    login: ({ email, password }) => dispatch(login({ email, password })),
    clearErrors: () => dispatch(clearErrors())
});

class LoginModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            email: '',
            password: '',
            msg: null
        };
    };

    componentDidUpdate(prevProps) {
        const { errors } = this.props;
        const { isAuthenticated } = this.props.auth;

        if (errors !== prevProps.errors) {
            // Check for login error           
            if (errors.id === 'LOGIN_FAIL') {
                this.setState({ msg: errors.msg.msg });

            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password
        };

        // Attempt to login
        this.props.login(user);
    };

    render() {
        return (
            <div>
                <Fragment>
                    <NavLink onClick={this.toggle} href='#'>
                        Увійти
                    </NavLink>
                </Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Вхід на сайт</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='email'>Email:</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='example@mail.com'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='password'>Пароль:</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button className='w-25' color='dark' style={{ marginTop: '2rem' }} block>
                                    Увійти
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);