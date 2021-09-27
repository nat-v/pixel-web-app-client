import React, { Component, Fragment } from 'react';
import {
    Toast,
    ToastBody,
    Row,
    Col,
    Container,
    Form,
    Label,
    Input,
    Button,
    FormGroup,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { updatePost } from '../../redux/actions/postActions';
import { loadCategories } from '../../redux/actions/categoryActions';

const mapStateToProps = state => {
    return {
        post: state.post,
        category: state.category
    };
};

const mapDispatchToProps = (dispatch) => ({
    updatePost: (id, { category, title, description }) => dispatch(updatePost(id, { category, title, description })),
    loadCategories: () => dispatch(loadCategories())
});

class ChangePost extends Component {

    state = {
        category: '',
        title: '',
        description: ''
    };

    componentDidMount() {
        this.props.loadCategories();

        this.setState({
            title: this.props.post.chosenPost.title,
            //category: this.props.category.categories.filter((category) => category._id === parseInt(this.props.post.chosenPost._category, 10))[0],
            description: this.props.post.chosenPost.description
        });

        //console.log(this.props.category.categories);
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = event => {
        event.preventDefault();

        const { category, title, description } = this.state;

        const post = {
            category,
            title,
            description
        };

        // Attempt to update Post data
        this.props.updatePost(this.props.post.chosenPost._id, post);
    };

    render() {
        const { chosenPost } = this.props.post;
        const { categories } = this.props.category;
        return (
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Головна</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to='/posts'>Мої дописи</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={`/posts/view/${chosenPost._id}`}>Деталі допису</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Зміна допису</BreadcrumbItem>
                </Breadcrumb>
                {chosenPost ?
                    <Row className='justify-content-center'>
                        <Col md='auto' className='m-2 rounded'>
                            <Toast>
                                <img src={chosenPost._image.path} alt={chosenPost._image.name} />
                            </Toast>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for='title'>Заголовок:</Label>
                                    <Input
                                        type='text'
                                        name='title'
                                        id='title'
                                        className='mb-3'
                                        defaultValue={chosenPost.title}
                                        onChange={this.onChange}
                                    />
                                    <Label for='description'>Опис:</Label>
                                    <Input
                                        type='textarea'
                                        name='description'
                                        id='description'
                                        className='mb-3'
                                        defaultValue={chosenPost.description}
                                        onChange={this.onChange}
                                    />
                                    <Label for='category'>Категорія:</Label>
                                    <Input
                                        type='select'
                                        name='category'
                                        id='category'
                                        className='mb-3'
                                        //selected={this.props.category.categories.filter((category) => category._id === parseInt(this.props.post.chosenPost._category, 10))[0]}
                                        onChange={this.onChange}
                                        required
                                    >
                                        {categories.map((category, i) => (
                                            <option>{category.name}</option>
                                        ))}
                                    </Input>
                                    <Button color='dark' style={{ marginTop: '2rem' }} block>
                                        Змінити
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    : null
                }
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePost);