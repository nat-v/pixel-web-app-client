import React, { Component } from 'react';
import {
    Toast,
    ToastBody,
    Row,
    Col,
    Badge,
    Container,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { deleteImage, getImage, exportImage } from '../../redux/actions/imageActions';
import { getPost } from '../../redux/actions/postActions';

const mapStateToProps = state => {
    return {
        image: state.image,
        post: state.post
    };
};

const mapDispatchToProps = (dispatch) => ({
    getImage: (id) => dispatch(getImage(id)),
    deleteImage: (id) => dispatch(deleteImage(id)),
    getPost: (id) => dispatch(getPost(id)),
    exportImage: (uri) => dispatch(exportImage(uri))
});

class ImageDetails extends Component {

    delete = (id) => {
        confirmAlert({
            title: 'Видалення зображення',
            message: 'Ви впевнені, що хочете видалити це зображення? Видалення зображення також видалить ваш допис, що відноситься до цього зображення, якщо він уснує.',
            buttons: [
                {
                    label: 'Так',
                    onClick: () => {
                        this.props.deleteImage(id);
                        this.props.history.push('/gallery');
                    }
                },
                {
                    label: 'Ні'
                }
            ]
        });
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
                    <BreadcrumbItem active>Деталі зображення</BreadcrumbItem>
                </Breadcrumb>
                {chosenImage ?
                    <Row className='justify-content-center'>
                        <Col md='auto' className='m-2 rounded' key={chosenImage._id}>
                            <Toast>
                                <img src={chosenImage.path} alt={chosenImage.name} />
                            </Toast>
                        </Col>
                        <Col md='auto'>
                            <h3>
                                <p>{chosenImage.name}
                                    <Link to={`/gallery/update/${chosenImage._id}`}>
                                        <Badge className='m-3'>Змінити назву</Badge>
                                    </Link>
                                </p>
                            </h3>
                            <h5>
                                <p>
                                    Це зображення {chosenImage._post ? 'опубліковане' : 'приватне'}
                                    {chosenImage._post ?
                                        <Link to={`/posts/view/${chosenImage._post}`}>
                                            <Badge className='m-3' onClick={() => this.props.getPost(chosenImage._post)}>Переглянути допис</Badge>
                                        </Link>
                                        :
                                        <Link to={`/posts/create/${chosenImage._id}`}>
                                            <Badge className='m-3'>Опублікувати</Badge>
                                        </Link>
                                    }
                                </p>
                            </h5>
                            <p>Розмір (ширина х висота): {chosenImage.cols} x {chosenImage.rows}</p>
                            <p>
                                Створено: {new Intl.DateTimeFormat('uk-UK', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(chosenImage.createdAt)))}
                            </p>
                            <h4>
                                <Link>
                                    <Badge onClick={() => this.props.exportImage(chosenImage.path)}>Завантажити</Badge>
                                </Link>
                            </h4>
                            <h4>
                                <Link>
                                    <Badge onClick={() => this.delete(chosenImage._id)} color='danger'>Видалити</Badge>
                                </Link>
                            </h4>
                        </Col>
                    </Row >
                    : null
                }
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetails);