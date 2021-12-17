import React, { Component, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter, useHistory } from 'react-router-dom';

import ProtectedRoute from '../app/ProtectedRoute';

import ProfileSettings from '../profile/ProfileSettings';
import Header from './Header';
import Home from './Home';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import Editor from '../editor/Editor';
import Gallery from '../gallery/Gallery';
import Footer from './Footer';
import ImageDetails from '../gallery/ImageDetails';
import CreatePost from '../posts/CreatePost';
import ViewPosts from '../posts/ViewPosts';
import PostDetails from '../posts/PostDetails';
import UpdateProfile from '../profile/UpdateProfile';
import UpdatePassword from '../profile/UpdatePassword';
import ViewProfile from '../profile/ViewProfile';
import PostsInCategory from '../posts/PostsInCategory';
import ChangeImage from '../gallery/ChangeImage';
import ChangePost from '../posts/ChangePost';
import UsersList from '../users/UsersList';
import Publications from '../publications/Publications';
import SavedPosts from '../posts/SavedPosts';

import { logout } from '../../redux/actions/authActions';

const mapStateToProps = state => {
    return {
        editor: state.editor,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const ChangeProfile = () => {
            return (
                <ProfileSettings profileSettings={<UpdateProfile user={this.props.auth.user} />} />
            );
        };

        const ChangePassword = () => {
            return (
                <ProfileSettings profileSettings={<UpdatePassword user={this.props.auth.user} />} />
            );
        };        

        /*const UserProfile = ({ match }) => {
            return (
                <ViewProfile loadUser={match.params.username} />
            );
        };*/

        const Logout = () => {
            return (
                this.props.history.push('/home')
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/login' component={LoginModal} />
                    <Route exact path='/register' component={RegisterModal} />
                    <Route exact path='/editor' component={Editor} />
                    {isAuthenticated ?
                            <Fragment>
                                <Route exact path='/logout' component={Logout} />
                                <Route exact path='/users' component={UsersList} />
                                <Route exact path='/publications' component={Publications} />
                                <Route exact path='/profile/view/:username' component={ViewProfile} />
                                <Route exact path='/profile/update' component={ChangeProfile} />
                                <Route exact path='/profile/changePassword' component={ChangePassword} />
                                <Route exact path='/gallery' component={Gallery} />
                                <Route exact path='/gallery/view/:imageId' component={ImageDetails} />
                                <Route exact path='/gallery/update/:imageId' component={ChangeImage} />
                                <Route exact path='/posts' component={ViewPosts} />
                                <Route exact path='/posts/create/:imageId' component={CreatePost} />
                                <Route exact path='/posts/update/:postId' component={ChangePost} />
                                <Route exact path='/posts/view/:postId' component={PostDetails} />
                                <Route exact path='/posts/category/:categoryId' component={PostsInCategory} />
                                <Route exact path='/saved' component={SavedPosts} />
                            </Fragment>
                            : <Redirect to='/home' />
                    }
                    <Route path='*' component={() => '404 NOT FOUND'} />
                </Switch>
                {
                    !this.props.editor.isEditorOpen ?
                        <Footer /> : null
                }
            </div >
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
