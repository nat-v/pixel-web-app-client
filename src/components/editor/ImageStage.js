import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Rect } from 'react-konva';
import {
    Row,
    Col
} from 'reactstrap';

import { penColorChanged, clearGrid, fillSameColor, openEditor } from '../../redux/actions/editorActions';

const mapStateToProps = state => {
    return {
        editor: state.editor,
        image: state.image
    };
};

const mapDispatchToProps = (dispatch) => ({
    penColorChanged: (color) => dispatch(penColorChanged(color)),
    openEditor: () => dispatch(openEditor()),
    clearGrid: (ref) => dispatch(clearGrid(ref)),
    fillSameColor: (ref, targetColor, pColor) => dispatch(fillSameColor(ref, targetColor, pColor))
});

class ImageStage extends Component {
    state = {
        isDrawing: false
    };

    componentDidMount() {
        this.props.openEditor();

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    };

    componentDidUpdate() {
        this.sendStageRef();
    };

    cellClicked = e => {
        const { tool } = this.props.editor;

        if (tool === 'pencil') {
            e.target.setAttrs({
                fill: this.props.editor.penColor
            });
            e.target.to({
                fill: this.props.editor.penColor
            });
        } else if (tool === 'color_picker') {
            this.props.penColorChanged(e.target.attrs.fill);
        } else if (tool === 'eraser') {
            e.target.setAttrs({
                fill: this.props.editor.bgColor
            });
            e.target.to({
                fill: this.props.editor.bgColor
            });
        } else if (tool === 'paint_bucket_bg') {
            this.props.fillSameColor(this.layerRef, e.target.attrs.fill, this.props.editor.penColor);
        }
    };

    onMouseMoveLayer = e => {
        const { tool } = this.props.editor;
        if (this.state.isDrawing) {
            if (tool === 'pencil') {
                e.target.setAttrs({
                    fill: this.props.editor.penColor
                });
                e.target.to({
                    fill: this.props.editor.penColor
                });
            } else if (tool === 'eraser') {
                e.target.setAttrs({
                    fill: this.props.editor.bgColor
                });
                e.target.to({
                    fill: this.props.editor.bgColor
                });
            };
        };
    };

    onMouseDownLayer = () => {
        this.setState({
            isDrawing: true
        });
    };

    onMouseUpLayer = () => {
        this.setState({
            isDrawing: false
        });
    };

    onMouseLeaveLayer = () => {
        this.setState({
            isDrawing: false
        });
    };

    sendStageRef = () => {
        this.props.stage(this.stageRef);
    };


    render() {
        const { rows, cols, cells, bgColor } = this.props.editor;
        return (
            <Fragment>
                {rows && cols ?
                    <div className="p-3 bg-secondary my-2 rounded">
                        <Row style={{ color: 'grey' }}>
                            <Col>

                                <Stage
                                    width={cols * 10 + 2}
                                    height={rows * 10 + 2}
                                    ref={node => { this.stageRef = node }}
                                    style={{ cursor: 'crosshair' }}
                                >
                                    <Layer
                                        onMouseMove={this.onMouseMoveLayer}
                                        onMouseDown={this.onMouseDownLayer}
                                        onMouseUp={this.onMouseUpLayer}
                                        onMouseLeave={this.onMouseLeaveLayer}
                                        onTouchStart={this.cellClicked}
                                        onTouchMove={this.onMouseMoveLayer}
                                        onTouchEnd={this.onMouseUpLayer}
                                        ref={node => { this.layerRef = node }}
                                    >
                                        <Rect
                                            x={1}
                                            y={1}
                                            width={cols * 10}
                                            height={rows * 10}
                                            fill={bgColor}
                                        />
                                        {cells.map((cell, i) => (
                                            <Rect
                                                key={i}
                                                x={cell.x}
                                                y={cell.y}
                                                width={cell.width}
                                                height={cell.width}
                                                fill='rgba(0,0,0,0)'
                                                onMouseDown={this.cellClicked}
                                            />
                                        ))}
                                    </Layer>
                                </Stage>
                            </Col>
                        </Row>
                    </div>
                    : null}
            </Fragment >

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageStage);
