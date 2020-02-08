import React from 'react';

import { Form, Button } from 'react-bootstrap';

import { Container } from './styles';

export default function Task(props) {
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            event.preventDefault();
            let { id } = props.match.params;

            let task = await api.get('', { params: { '': '' } });

            if (task) {
                props.history.push('/main');
            }
        } catch (e) {
            alert(e);
        }
    }

    function onClickBack() {
        props.history.push('/main');
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>New Project</h1>
                <Form.Group controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" />
                </Form.Group>
                <Form.Group controlId="Actions" className="button-card-actions">
                    <Button variant="info" size="lg" type="submit" className="button-save-task">
                        Salvar
                    </Button>
                    <Button
                        className="button-cancel-task"
                        variant="secondary"
                        size="lg"
                        type="button"
                        onClick={onClickBack}
                    >
                        Cancelar
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
