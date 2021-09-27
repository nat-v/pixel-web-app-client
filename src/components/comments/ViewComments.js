import React, { Component, Fragment } from 'react';
import { Table, Badge, Container } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { deleteComment, loadAllComments } from '../../redux/actions/commentActions';
import CommentModal from './CommentModal';

const mapStateToProps = state => {
    return {
        comment: state.comment
    };
};

const mapDispatchToProps = (dispatch) => ({
    deleteComment: (id) => dispatch(deleteComment(id)),
    loadAllComments: () => dispatch(loadAllComments())
});


class ViewComments extends Component {

    componentDidMount() {
        this.props.loadAllComments();
    };

    delete = (id) => {
        confirmAlert({
            title: 'Видалення коментаря',
            message: 'Ви впевнені, що хочете видалити цей коментар?',
            buttons: [
                {
                    label: 'Так',
                    onClick: () => {
                        this.props.deleteComment(id);
                        this.props.history.push('/admin/comment/view');
                    }
                },
                {
                    label: 'Ні'
                }
            ]
        });
    };

    render() {
        const { comments } = this.props.comment;
        return (
            <Fragment>
                {comments ?
                    <div>
                        <Table md='auto' dark>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Текст коментаря</th>
                                    <th>Автор</th>
                                    <th>Видалити</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment, i) => (
                                    <tr>
                                        <th key={i} scope='row'>{i + 1}</th>
                                        <td>{comment.text}</td>
                                        <td>{comment._author.username}</td>
                                        <td>
                                            <Link>
                                                <span onClick={() => this.delete(comment._id)} className='fa fa-trash fa-lg m-2' to=''></span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewComments));