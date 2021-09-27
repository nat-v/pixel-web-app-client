import React, { Component, Fragment } from 'react';
import {
    Button,
    Badge,
    Card,
    CardImg,
    Label,
    Input,
    CardBody,
    Form,
    FormGroup,
    CardTitle
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changePassword } from '../../redux/actions/profileActions';

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => ({
    changePassword: (id, { oldPass, newPass }) => dispatch(changePassword(id, { oldPass, newPass }))
});

export class UpdatePassword extends Component {

    state = {
        oldPass: '',
        newPass: '',
        confirmPass: ''
    };

    onSubmit = event => {
        event.preventDefault();

        const { oldPass, newPass } = this.state;

        // Create updated password data (old password to compare with current password and new password of user)
        const updatedPass = {
            oldPass,
            newPass
        };

        if (this.state.newPass === this.state.confirmPass && this.state.newPass != '') {
            this.props.changePassword(this.props.user._id, updatedPass)
        } else {
            console.log('The new password and confirm password are empty.');
        }
    };

    inputOnChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { user } = this.props;
        return (
            <Fragment>
                <Card className='mt-4' body inverse color='dark'>
                    <CardBody>
                        <CardTitle className='mb-3'>
                            <h3>Зміна паролю</h3>
                        </CardTitle>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='currentPassword'>Поточний пароль</Label>
                                <Input
                                    type='password'
                                    id='currentPassword'
                                    name='oldPass'
                                    className='mb-3'
                                    onChange={this.inputOnChange}
                                />
                                <Label for='newPassword'>Новий пароль</Label>
                                <Input
                                    type='password'
                                    id='newPassword'
                                    name='newPass'
                                    className='mb-3'
                                    onChange={this.inputOnChange}
                                />
                                <Label for='confirmPassword'>Підтвердити пароль</Label>
                                <Input
                                    type='password'
                                    id='confirmPassword'
                                    name='confirmPass'
                                    className='mb-3'
                                    onChange={this.inputOnChange}
                                />
                                <Button className='w-25' color='secondary' style={{ marginTop: '2rem' }} block>
                                    Зберегти зміни
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdatePassword));
