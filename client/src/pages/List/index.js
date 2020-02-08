import React from 'react';

import { Form, Button } from 'react-bootstrap';

import { Container } from './styles';

export default function List(props) {
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            event.preventDefault();
            let { id } = props.match.params;

            let list = await api.get('', { params: { '': '' } });
            if (list) {
                props.history.push('/main');
            }
        } catch (error) {
            console.error(error);
        }
    }

    function onClickBack() {
        props.history.push('/main');
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h4>New List</h4>
                <Form.Group controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" />
                </Form.Group>
                <Form.Group controlId="Actions" className="button-card-actions">
                    <Button className="button-save-list" variant="info" size="lg" type="submit">
                        Salvar
                    </Button>
                    <Button
                        variant="secondary"
                        className="button-cancel-list"
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
