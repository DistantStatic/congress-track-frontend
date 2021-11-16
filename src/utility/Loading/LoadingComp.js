import React, { Component } from 'react';
import { Spinner, Container } from 'react-bootstrap';

export default class MemberModal extends Component {
    render() {
        return (
            <div className="captivate">
                <Container>
                    <Spinner animation={'border'} role={'status'} style={{width: "10em", height: "10em"}} variant="primary" />
                </Container>
            </div>
        )
    }
}