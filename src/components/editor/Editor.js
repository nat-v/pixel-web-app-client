import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsPanel from './ToolsPanel';
import ImageStage from './ImageStage';

class Editor extends Component {
    state = {
        stageReference: null
    };

    getStageRef = (stage) => {
        this.setState({ stageReference: stage })
    }

    render() {
        return (
            <div>
                <Row className='align-items-center mr-0'>
                    <Col md='3'>
                        <ToolsPanel imageURI={this.state.stageReference} />
                    </Col>
                    <Col md='auto' md={{ offset: 2 }} >
                        <ImageStage stage={this.getStageRef} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default (Editor);
