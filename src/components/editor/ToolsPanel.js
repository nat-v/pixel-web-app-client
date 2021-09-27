import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardTitle,
    UncontrolledTooltip,
    UncontrolledButtonDropdown
} from 'reactstrap';
import { connect } from 'react-redux';

import { SketchPicker } from 'react-color'
import GridModal from './GridModal';
import SaveToGalleryModal from './SaveToGalleryModal';
import { clearErrors } from '../../redux/actions/errorActions';
import { changeTool, setDefault, discardGrid, penColorChanged, clearGrid } from '../../redux/actions/editorActions';
import { exportImage } from '../../redux/actions/imageActions';

const mapStateToProps = state => {
    return {
        errors: state.errors,
        editor: state.editor,
        auth: state.auth,
        image: state.image
    };
};

const mapDispatchToProps = (dispatch) => ({
    setDefault: () => dispatch(setDefault()),
    discardGrid: () => dispatch(discardGrid()),
    penColorChanged: (color) => dispatch(penColorChanged(color)),
    clearErrors: () => dispatch(clearErrors()),
    exportImage: (uri) => dispatch(exportImage(uri)),
    changeTool: (tool) => dispatch(changeTool(tool)),
    clearGrid: (ref, color) => dispatch(clearGrid(ref, color))
});


class ToolsPanel extends Component {
    state = {
        gridModal: true,
        saveModal: false
    };

    componentDidMount() {
        this.props.discardGrid();
    };

    penColorOnChange = (color) => {
        this.props.penColorChanged(color.hex);
    };

    toggleGridModal = () => {
        // Clear errors
        this.props.clearErrors();

        this.setState({
            gridModal: !this.state.gridModal
        });
    };

    toggleSaveModal = () => {
        // Clear errors
        this.props.clearErrors();

        this.setState({
            saveModal: !this.state.saveModal
        });
    };

    saveToGallery = () => {
        this.setState({ saveModal: true });
    };

    componentDidUpdate() {
        const { isSetSize } = this.props.editor;
        const { imageSaved } = this.props.image;
        if (this.state.gridModal) {
            if (isSetSize) {
                this.toggleGridModal();
                this.props.setDefault();
            }
        };
        if (this.state.saveModal) {
            if (imageSaved) {
                this.toggleSaveModal();
            }
        };
    };

    createNew = () => {
        this.setState({ gridModal: true });
        this.props.discardGrid();
    };

    export = () => {
        const uri = this.props.imageURI.getStage().toDataURL({ quality: 1 });
        this.props.exportImage(uri);
    };

    render() {
        const { rows, cols, penColor } = this.props.editor;
        const { user } = this.props.auth;
        return (
            <Fragment>
                <Card body color='dark'>
                    <CardTitle className='text-white'><strong>ПАНЕЛЬ ІНСТРУМЕНТІВ</strong></CardTitle>
                    <Row>
                        <Col md='auto'>
                            <UncontrolledButtonDropdown className='mb-3'>
                                <DropdownToggle caret color='warning'>
                                    Зображення
                            </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.createNew}>Створити нове</DropdownItem>
                                    {rows && cols ?
                                        <DropdownItem onClick={this.export}>Експортувати (.png)</DropdownItem>
                                        : null}
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </Col>
                    </Row>
                    <Row className='justify-content-center mb-3'>
                        <Col md='auto'>
                            <a onClick={() => this.props.changeTool('eraser')} id='eraser'><img src='/assets/icons/editor/eraser.png' width='65' height='60' alt='eraser' /></a>
                            <UncontrolledTooltip placement='top' target='eraser'>Гумка</UncontrolledTooltip>
                        </Col>
                        <Col md='auto'>
                            <a onClick={() => this.props.changeTool('pencil')} id='pencil'><img src='/assets/icons/editor/pencil.png' width='60' height='60' alt='pencil' /></a>
                            <UncontrolledTooltip placement='top' target='pencil'>Олівець</UncontrolledTooltip>
                        </Col>
                        <Col md='auto'>
                            <a onClick={() => this.props.changeTool('color_picker')} id='color_picker'><img src='/assets/icons/editor/pipette.png' width='60' height='60' alt='pipette' /></a>
                            <UncontrolledTooltip placement='top' target='color_picker'>Піпетка</UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row className='justify-content-center mb-3'>
                        <Col md='auto'>
                            <a onClick={() => this.props.clearGrid(this.props.imageURI, this.props.editor.bgColor)} id='clear'><img src='/assets/icons/editor/clear.png' width='60' height='60' alt='clear_all' /></a>
                            <UncontrolledTooltip placement='top' target='clear'>Очистити все</UncontrolledTooltip>
                        </Col>
                        <Col md='auto'>
                            <a onClick={() => this.props.changeTool('paint_bucket_bg')} id='paint_bucket'><img src='/assets/icons/editor/paint_bucket.png' width='60' height='60' alt='paint_bucket' /></a>
                            <UncontrolledTooltip placement='top' target='paint_bucket'>Заливка - зафарбовує пікселі одного кольору</UncontrolledTooltip>
                        </Col>
                        {user ?
                            <Col md='auto'>
                                <a onClick={this.saveToGallery} id='save'><img src='/assets/icons/editor/save.png' width='60' height='60' alt='save' /></a>
                                <UncontrolledTooltip placement='top' target='save'>Зберегти у галерею</UncontrolledTooltip>
                            </Col>
                            : null}
                    </Row>
                    <Row className='justify-content-center'>
                        <Col md='auto'>
                            <SketchPicker disableAlpha color={penColor} onChange={this.penColorOnChange} className='m-3' />
                            <GridModal isOpen={this.state.gridModal} toggle={this.toggleGridModal} />
                            <SaveToGalleryModal isOpen={this.state.saveModal} toggle={this.toggleSaveModal} imageURI={this.props.imageURI} />
                        </Col>
                    </Row>
                </Card>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPanel);