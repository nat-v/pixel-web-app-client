import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    CustomInput,
    Row,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color'

import { setSize, createGrid } from '../../redux/actions/editorActions';
import { clearErrors } from '../../redux/actions/errorActions';

const mapStateToProps = state => {
    return {
        errors: state.errors,
        editor: state.editor
    };
};

const mapDispatchToProps = (dispatch) => ({
    setSize: ({ cols, rows }, bgColor) => dispatch(setSize({ cols, rows }, bgColor)),
    createGrid: (cols, rows) => dispatch(createGrid(cols, rows)),
    clearErrors: () => dispatch(clearErrors())
});

class GridModal extends Component {
    state = {
        cols: '',
        rows: '',
        bgColor: 'rgba(0,0,0,0)',
        pickerColor: '#ffffff',
        transparent: true,
        dropDownOpen: false,
        customSize: false,
        msg: null
    };


    bgColorChanged = (color) => {
        this.setState({
            bgColor: color.hex,
            pickerColor: color.hex
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeSwitch = e => {
        this.setState({ transparent: e.target.checked });

        /*if (this.state.transparent) {
            this.setState({ bgColor: '#00000000' });
        };*/
    };

    dropDownOnClick = e => {
        this.setState({
            cols: e.target.value,
            rows: e.target.value
        });
    };

    checkboxOnChange = e => {
        this.setState({
            customSize: e.target.checked
        });
    };

    toggleDropDown = () => {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const { cols, rows } = this.state;
        const grid = {
            cols,
            rows
        };

        // Attempt to set size of the grid
        this.props.setSize(grid, this.state.bgColor);

        this.props.createGrid(this.state.cols, this.state.rows);

        this.setState({
            cols: null,
            rows: null,
            bgColor: 'rgba(0,0,0,0)',
            transparent: true
        });
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size='md'>
                    <ModalHeader toggle={this.props.toggle}>Розмір зображення</ModalHeader>
                    <ModalBody>
                        {this.props.errorMessage ? (
                            <Alert color='danger'>{this.props.errorMessage}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Dropdown direction='right' isOpen={this.state.dropDownOpen} toggle={this.toggleDropDown}>
                                            <DropdownToggle caret>
                                                Пресети розміру
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem value='10' onClick={this.dropDownOnClick}>10 x 10</DropdownItem>
                                                <DropdownItem value='16' onClick={this.dropDownOnClick}>16 x 16</DropdownItem>
                                                <DropdownItem value='24' onClick={this.dropDownOnClick}>24 x 24</DropdownItem>
                                                <DropdownItem value='32' onClick={this.dropDownOnClick}>36 x 36</DropdownItem>
                                                <DropdownItem value='48' onClick={this.dropDownOnClick}>48 x 48</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <CustomInput onChange={this.checkboxOnChange} type='checkbox' id='customSize' label='Задати розмір вручну' inline />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for='cols'>Ширина</Label>
                                        <Input
                                            type='number'
                                            min='10'
                                            max='50'
                                            value={this.state.cols}
                                            name='cols'
                                            id='cols'
                                            className='mb-5'
                                            onChange={this.onChange}
                                            disabled={!this.state.customSize}
                                        />

                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for='rows'>Висота</Label>
                                        <Input
                                            type='number'
                                            min='10'
                                            max='50'
                                            value={this.state.rows}
                                            name='rows'
                                            id='rows'
                                            className='mb-5'
                                            onChange={this.onChange}
                                            disabled={!this.state.customSize}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <CustomInput type='switch' className='mb-3' id='transparentBackground' name='transparentBackground' checked={this.state.transparent} onChange={this.onChangeSwitch} label='Прозорий фон' />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        {this.state.transparent ? null :
                                            <div>
                                                <Label for='bgColor'>Колір фону</Label>
                                                <SketchPicker disableAlpha className='mb-3' color={this.state.pickerColor} onChange={this.bgColorChanged} id='bgColor' />
                                            </div>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button color='dark' size='md'>
                                Створити
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridModal);