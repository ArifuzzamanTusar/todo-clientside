
import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div>
            <Container>
                <div className="spinner-full d-flex justify-content-center  align-items-center">
                    <Spinner animation="grow" variant="dark" />
                </div>
            </Container>
        </div>
    );
};

export default Loading;