import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input, Textarea } from '@rocketseat/unform'; // eslint-disable-next-line
import api from '~/services/api';
import * as Yup from 'yup';
import { Container } from './styles';

const schema = Yup.object().shape({
    title: Yup.string().required('Please enter title'),
    description: Yup.string().required('Description is required'),
});

export default function Project(props) {
    async function handleSubmit(event) {
        try {
            let { id } = props.match.params;

            if (!/\d{4}-\d{2}-\d{2}$/.test(document.querySelector('#dateCompletion').value)) {
                return toast.error('Task needs a date.');
            }

            let task = await api.post(`/lists/${id}/tasks`, {
                title: event.title,
                description: event.description,
                dateCompletion: document.querySelector('#dateCompletion').value,
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
                <h4>New Task</h4>
                <div className="form-group">
                    <label>Title</label>
                    <Input className="form-control" placeholder="Title" type="text" name="title" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <Textarea className="form-control" placeholder="Description" type="text" name="description" />
                </div>
                <div className="form-group">
                    <label>Date Completion</label>
                    <input
                        className="form-control"
                        placeholder="Date completion"
                        type="date"
                        id="dateCompletion"
                        name="dateCompletion"
                    />
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
