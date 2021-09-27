import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

class Logout extends Component {

    logout = () => {
        this.props.logout();
    };

    render() {
        return (
            <Fragment>
                <NavLink onClick={this.logout} className='nav-link text-danger' href='#' to='/logout'>
                    Вийти
                </NavLink>
            </Fragment >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
