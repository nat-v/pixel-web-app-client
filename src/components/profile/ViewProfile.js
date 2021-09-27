import React, { Component, Fragment } from 'react';
import {
    Container,
    Jumbotron,
    Toast,
    ToastBody,
    Media,
    Row,
    Col
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import profileBg from '../../images/profileBg.png';
import profileImg from '../../images/avatar.png';

const mapStateToProps = state => {
    return {
        user: state.user
    };
};


class ViewProfile extends Component {

    render() {
        const { chosenUser } = this.props.user;
        return (
            <Fragment>
                {chosenUser ?
                    <Jumbotron fluid style={{ backgroundImage: `url(${chosenUser.backgroundPic ? chosenUser.backgroundPic : profileBg})`, backgroundSize: 'cover' }}>
                        <Container>
                            <Row className='justify-content-center'>
                                <Media>
                                    <Col md='4'>
                                        <Media left>
                                            <Media width='50%' object src={chosenUser.profilePic ? chosenUser.profilePic : profileImg} alt='Profile picture' />
                                        </Media>
                                    </Col>
                                    <Col md='auto'>
                                        <Toast className="p-3 my-2 rounded">
                                            <Media> @{chosenUser.username}</Media>
                                            <Media>
                                                <h1>
                                                    {chosenUser.displayName}
                                                </h1>
                                            </Media>
                                            <Media>
                                                <h5>
                                                    {chosenUser.bio}
                                                </h5>
                                            </Media>

                                            <Link>
                                                <Media ><h5>Переглянути публікації</h5></Media>
                                            </Link>
                                        </Toast>
                                    </Col>
                                </Media>
                            </Row>
                        </Container>
                    </Jumbotron>
                    : null}
            </Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps)(ViewProfile));