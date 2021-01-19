import React, { Component } from 'react';
import { Spinner, Container } from 'reactstrap';

export default class MemberModal extends Component {
    render() {
        return (
            <div className="captivate">
                <Container>
                    <Spinner style={{width: "10em", height: "10em"}} color="primary" />
                </Container>
            </div>
        )
    }
}