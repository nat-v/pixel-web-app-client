import React, { Component } from 'react';
import {
    Card,
    Jumbotron,
    CardBody,
    CardTitle,
    Row,
    Col,
    Container,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    CardImg,
    Toast,
    ToastBody,
    ToastHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadGallery } from '../../redux/actions/galleryActions';
import { getImage } from '../../redux/actions/imageActions';

import bgimage from '../../images/bgImage.jpg'

const mapStateToProps = state => {
    return {
        gallery: state.gallery,
        image: state.image
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadGallery: () => dispatch(loadGallery()),
    getImage: (id) => dispatch(getImage(id))
});

class Gallery extends Component {

    componentDidMount() {
        this.props.loadGallery();
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>Галерея</h1>
                </Jumbotron>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Головна</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Галерея</BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    {this.props.gallery.images.map((image) =>
                        <Col md='3' className='mb-3 my-1 rounded' key={image._id}>
                            <Toast body>
                                <img width='100%' height='250' src={image.path} alt={image.name} />
                                <ToastBody>
                                    <ToastHeader><h5>{image.name}</h5></ToastHeader>
                                    <Link to={`/gallery/view/${image._id}`}>
                                        <h4>
                                            <Badge onClick={() => this.props.getImage(image._id)} color='secondary'>Переглянути</Badge>
                                        </h4>
                                    </Link>
                                </ToastBody>
                            </Toast>
                        </Col>
                    )}
                </Row>
            </Container >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);