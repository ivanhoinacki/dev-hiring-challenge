import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import * as Yup from 'yup';
import { Container } from './styles';

const schema = Yup.object().shape({
    title: Yup.string().required('Please enter your name'),
    description: Yup.string().required('E-mail is required'),
    dateComplete: Yup.date().required('Password is required'),
});

export default function Project(props) {
    async function handleSubmit({ title, description, dateComplete }) {
        try {
            let { id } = props.match.params;

            let task = await api.post(`/lists/${id}/tasks`, {
                title: title,
                description: description,
                dateComplete: dateComplete,
            });

            if (task) {
                toast.success('Task saved successfully.');
                props.history.push('/main');
            }
        } catch (e) {
            toast.error('Task not saved. Please verify your data.');
        }
    }

    function onClickBack() {
        props.history.push('/main');
    }

    return (
        <Container>
            <Form schema={schema} onSubmit={handleSubmit}>
                <h4>New Project</h4>
                <div className="form-group">
                    <label>Title</label>
                    <Input className="form-control" placeholder="Title project on board" type="text" name="title" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <Input className="form-control" placeholder="Title project on board" type="text" name="title" />
                </div>
                <div className="form-group">
                    <label>Date Complete</label>
                    <Input className="form-control" placeholder="Title project on board" type="text" name="title" />
                </div>
                <div className="form-group button-card-actions">
                    <button className="btn btn-info button-save-task" size="lg" type="submit">
                        Salvar
                    </button>
                    <button
                        className="btn btn-secondary button-cancel-task"
                        variant="secondary"
                        type="button"
                        onClick={onClickBack}
                    >
                        Cancelar
                    </button>
                </div>
            </Form>
        </Container>
    );
}
