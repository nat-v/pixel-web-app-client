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

import { updateImage } from '../../redux/actions/imageActions';

const mapStateToProps = state => {
    return {
        image: state.image
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateImage: (id, name) => dispatch(updateImage(id, name))
});

class ChangeImage extends Component {

    state = {
        name: ''
    };

    componentDidMount() {
        this.setState({
            name: this.props.image.chosenImage.name
        });
    };

    showAlert = () => {
        confirmAlert({
            title: 'Зміна назви зображення',
            message: 'Внесені зміни було збережено.',
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => this.props.history.push(`/gallery`)
                }
            ]
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = event => {
        event.preventDefault();

        // Attempt to update Image name
        this.props.updateImage(this.props.image.chosenImage._id, this.state.name);
        this.showAlert();
    };

    render() {
        const { chosenImage } = this.props.image;
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
                    <BreadcrumbItem active>Змінити зображення</BreadcrumbItem>
                </Breadcrumb>
                <Row className='justify-content-center'>
                    <Col md='auto' className='m-2 rounded'>
                        <Toast>
                            <img src={chosenImage.path} alt={chosenImage.name} />
                        </Toast>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Назва зображення:</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    className='mb-3'
                                    defaultValue={chosenImage.name}
                                    onChange={this.onChange}
                                    required
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Змінити назву
                                        </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeImage);