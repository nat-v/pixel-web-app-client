import React, { Component, Fragment } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Toast,
    Row,
    Col,
    Container,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { createPost } from '../../redux/actions/postActions';
import { loadCategories } from '../../redux/actions/categoryActions';

const mapStateToProps = state => {
    return {
        post: state.post,
        image: state.image,
        auth: state.auth,
        category: state.category
    };
};

const mapDispatchToProps = (dispatch) => ({
    createPost: (image, author, { category, title, description }) => dispatch(createPost(image, author, { category, title, description })),
    loadCategories: () => dispatch(loadCategories())
});

class CreatePost extends Component {

    state = {
        title: '',
        description: '',
        category: ''
    };

    componentDidMount() {
        this.props.loadCategories();

        this.setState({
            title: this.props.image.chosenImage.name,
            category: 'Other'
        });
    };

    showAlert = () => {
        confirmAlert({
            title: 'Створення допису',
            message: 'Ваше зображення було успішно опубліковано.',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => this.props.history.push(`/posts`)
                }
            ]
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { title, description, category } = this.state;

        const post = {
            category,
            title,
            description
        };

        // Attempt to create new post      
        this.props.createPost(this.props.image.chosenImage, this.props.auth.user, post);
        this.showAlert();
    };

    render() {
        const { chosenImage } = this.props.image;
        const { categories } = this.props.category;
        return (
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Головна</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to='/gallery'>Галерея</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={`/gallery/view/${chosenImage._id}`}>Деталі зображення</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Створення допису</BreadcrumbItem>
                </Breadcrumb>
                <Row className='justify-content-center'>
                    <Col md='auto' className='m-2 rounded'>
                        <Toast>
                            <img src={chosenImage.path} alt={chosenImage.name} />
                        </Toast>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='title' required>Заголовок допису:</Label>
                                <Input
                                    type='text'
                                    name='title'
                                    id='title'
                                    className='mb-3'
                                    defaultValue={chosenImage.name}
                                    onChange={this.onChange}
                                    required
                                />
                                <Label for='description'>Опис:</Label>
                                <Input
                                    type='textarea'
                                    name='description'
                                    id='description'
                                    className='mb-3'
                                    placeholder="Це поле не обов'язкове для заповнення. Ви можете залишити його порожнім."
                                    onChange={this.onChange}
                                />
                                <Label for='category'>Оберіть категорію:</Label>
                                <Input
                                    type='select'
                                    name='category'
                                    id='category'
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                >
                                    {categories.map((category, i) => (
                                        <option key={i}>{category.name}</option>
                                    ))}
                                </Input>
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Створити допис
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);