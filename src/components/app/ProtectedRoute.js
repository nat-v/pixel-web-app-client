import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = this.props.auth;
    return (
        <Route {...rest}
            render={props => {
                if (isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={
                        {
                            pathname: "/home",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }}
        />
    )
};

export default connect(mapStateToProps)(ProtectedRoute);