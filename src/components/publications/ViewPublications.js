import React, { Component, Fragment } from 'react';
import { Table, Badge, Container } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { loadAllPosts, deletePost } from '../../redux/actions/postActions';

const mapStateToProps = state => {
    return {
        post: state.post
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadAllPosts: () => dispatch(loadAllPosts()),
    deletePost: (id) => dispatch(deletePost(id))
});


class ViewPublications extends Component {

    componentDidMount() {
        this.props.loadAllPosts();
    };

    delete = (id) => {
        confirmAlert({
            title: 'Видалення посту',
            message: 'Ви впевнені, що хочете видалити цей пост?',
            buttons: [
                {
                    label: 'Так',
                    onClick: () => {
                        this.props.deletePost(id);
                        this.props.history.push('/admin/publication/view');
                    }
                },
                {
                    label: 'Ні'
                }
            ]
        });
    };

    render() {
        const { posts } = this.props.post;
        return (
            <Fragment>
                {posts ?
                    <div>
                        <Table md='auto' dark>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Заголовок посту</th>
                                    <th>Зображення</th>
                                    <th>Категорія</th>
                                    <th>Змінити</th>
                                    <th>Видалити</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, i) => (
                                    <tr>
                                        <th key={i} scope='row'>{i + 1}</th>
                                        <td>{post.title}</td>
                                        <td><img width='50%' src={post._image.path} alt={post.title} /></td>
                                        <td>{post._category.name}</td>
                                        <td>
                                            <Link to={`/admin/publication/update/${post._id}`} >
                                                <span className='fa fa-pencil fa-lg m-2' to=''></span>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link>
                                                <span className='fa fa-trash fa-lg m-2' to=''></span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    : null
                }
            </Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPublications));