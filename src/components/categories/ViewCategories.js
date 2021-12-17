import React, { Component, Fragment } from 'react';
import { Table, Badge, Container } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { loadCategories, getCategory, deleteCategory } from '../../redux/actions/categoryActions';
import { loadPostsInCategory } from '../../redux/actions/postActions';

const mapStateToProps = state => {
    return {
        category: state.category,
        post: state.post
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadCategories: () => dispatch(loadCategories()),
    getCategory: (id) => dispatch(getCategory(id)),
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    loadPostsInCategory: (id) => dispatch(loadPostsInCategory(id))
});


class ViewCategories extends Component {

    componentDidMount() {
        this.props.loadCategories();
    };

    render() {
        const { categories } = this.props.category;
        return (
            <Fragment>
                {categories ?
                    <div>
                        <h4>
                            <Link to='/admin/category/create'>
                                <Badge color='success'>Cтворити</Badge>
                            </Link>
                        </h4>
                        <Table md='auto' dark>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Назва категорії</th>
                                    <th>Мініатюра (зображення)</th>
                                    <th>Публікації</th>
                                    <th>Змінити</th>
                                    <th>Видалити</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, i) => (
                                    <tr>
                                        <th key={i} scope='row'>{i + 1}</th>
                                        <td>{category.name}</td>
                                        <td><img width='50%' src={category.miniature} /></td>
                                        <td><Link to={`/admin/category/posts/${category._id}`} onClick={() => this.props.loadPostsInCategory(category._id)}>Переглянути</Link></td>
                                        <td>
                                            <Link to={`/admin/category/update/${category._id}`} >
                                                <span onClick={() => this.props.getCategory(category._id)} className='fa fa-pencil fa-lg m-2' to=''></span>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link>
                                                {category.name === 'Інше' ? null :
                                                    <span onClick={() => this.delete(category._id)} className='fa fa-trash fa-lg m-2' to=''></span>
                                                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewCategories));