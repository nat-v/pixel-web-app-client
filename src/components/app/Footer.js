import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

class Footer extends Component {
    render() {

        const { isAuthenticated, isAdmin, user } = this.props.auth;

        return (
            <div className="footer">
                <hr className="my-2" />
                <div className="container">
                    <div className="row">
                        <div className="col-2 offset-1 col-sm-2">
                            <h5>Pixel Art Editor</h5>
                            <ul className="list-unstyled" >
                                <li><Link className='text-dark' to='/editor'>Редактор</Link></li>
                            </ul>
                        </div>
                        {user ?
                            <Fragment>
                                <div className="col-2 offset-1 col-sm-2">
                                    <ul className="list-unstyled" >
                                        <li><Link className='text-dark' to='/gallery'>Галерея</Link></li>
                                        <li><Link className='text-dark' to='/posts'>Мої дописи</Link></li>
                                        <li><Link className='text-dark' to={`/profile/view/${user._id}`}>Профіль</Link></li>
                                    </ul>
                                </div>
                                <div className="col-2 offset-1 col-sm-2">
                                    <ul className="list-unstyled" >
                                        <li><Link className='text-dark' to='/users'>Користувачі</Link></li>
                                        <li><Link className='text-dark' to='/publications'>Публікації</Link></li>
                                        <li><Link className='text-dark' to='/saved'>Збережене</Link></li>
                                    </ul>
                                </div>
                            </Fragment>
                            : null}
                    </div>
                </div>
            </div >
        );
    }
}

export default connect(mapStateToProps)(Footer);