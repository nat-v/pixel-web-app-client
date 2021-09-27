import React, { Component, Fragment } from 'react';
import {
    Button,
    Badge,
    Card,
    Media,
    Label,
    Input,
    CardBody,
    Form,
    FormGroup,
    CardImg,
    CardImgOverlay,
    Col,
    Jumbotron
} from 'reactstrap';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { withRouter } from 'react-router-dom';

import { updateProfile, updateProfilePic, updateBackgroundPic } from '../../redux/actions/profileActions';

import profileBg from '../../images/profileBg.png';
import profileImg from '../../images/avatar.png';

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateProfile: (id, { displayName, username, bio }) => dispatch(updateProfile(id, { displayName, username, bio })),
    updateProfilePic: (id, pic) => dispatch(updateProfilePic(id, pic)),
    updateBackgroundPic: (id, pic) => dispatch(updateBackgroundPic(id, pic))
});

export class UpdateProfile extends Component {

    state = {
        selectedPhoto: null,
        displayName: '',
        username: '',
        bio: '',
        profilePic: null,
        backgroundPic: null
    };

    componentDidMount() {
        this.setState({
            displayName: this.props.user.displayName,
            username: this.props.user.username,
            bio: this.props.user.bio
        });
    };

    photoSelectHandler = event => {
        this.setState({
            selectedPhoto: event.target.files[0]
        });
    };

    onSubmit = event => {
        event.preventDefault();

        const { displayName, username, bio } = this.state;

        // Create updated user data
        const updatedUser = {
            displayName,
            username,
            bio
        };

        // Attempt to update Used data
        this.props.updateProfile(this.props.user._id, updatedUser);
    };

    showAlert = () => {
        confirmAlert({
            title: 'Дані профілю було змінено',
            message: 'Внесені зміни було збережено.',
            buttons: [
                {
                    label: 'Ok'
                }
            ]
        });
    };

    onChangeFile = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    onSubmitProfilePic = event => {
        event.preventDefault();

        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.state.profilePic);

        fileReader.onload = event => {
            // Attempt to update Profile Picture
            this.props.updateProfilePic(this.props.user._id, event.target.result);
            this.showAlert();
        };
    };

    onSubmitBackgroundPic = event => {
        event.preventDefault();

        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.state.backgroundPic);

        fileReader.onload = event => {
            // Attempt to update Background Picture
            this.props.updateBackgroundPic(this.props.user._id, event.target.result);
            this.showAlert();
        };
    };

    inputOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { user } = this.props;
        return (
            <Fragment>
                <Card className='mt-4' body color='dark' inverse>
                    <Card inverse>
                        <Jumbotron fluid style={{ backgroundImage: `url(${user.backgroundPic ? user.backgroundPic : profileBg})`, backgroundSize: 'cover' }}>
                            <CardImgOverlay>
                                <img width='25%' src={user.profilePic ? user.profilePic : profileImg} alt='Profile picture' />
                            </CardImgOverlay>
                        </Jumbotron>
                    </Card>
                    <Form onSubmit={this.onSubmitProfilePic} className='text-white'>
                        <FormGroup>
                            <Label for='profilePic'>Зображення профілю:</Label>
                            <Input
                                type='file'
                                id='profilePic'
                                name='profilePic'
                                onChange={this.onChangeFile}
                            />
                            <Button className='w-50' style={{ marginTop: '2rem' }} block>
                                Оновити зображення профілю
                            </Button>
                        </FormGroup>
                    </Form>
                    <Form onSubmit={this.onSubmitBackgroundPic} className='text-white'>
                        <FormGroup>
                            <Label for='backgroundPic'>Фонове зображення:</Label>
                            <Input
                                type='file'
                                id='backgroundPic'
                                name='backgroundPic'
                                onChange={this.onChangeFile}
                            />
                            <Button className='w-50' style={{ marginTop: '2rem' }} block>
                                Оновити фонове зображення
                            </Button>
                        </FormGroup>
                    </Form>
                    <CardBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='displayName'>Ім'я для відображення:</Label>
                                <Input
                                    type='text'
                                    id='displayName'
                                    name='displayName'
                                    defaultValue={user.displayName}
                                    className='mb-3'
                                    onChange={this.inputOnChange}
                                />
                                <Label for='username'>Username:</Label>
                                <Input
                                    type='text'
                                    id='username'
                                    name='username'
                                    defaultValue={user.username}
                                    className='mb-3'
                                    onChange={this.inputOnChange}
                                />
                                <Label for='bio'>Біографія:</Label>
                                <Input
                                    type='textarea'
                                    id='bio'
                                    name='bio'
                                    defaultValue={user.bio}
                                    className='mb-3'
                                    placeholder='Tell about yourself'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateProfile));
