import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import * as Yup from 'yup';
import { Container } from './styles';

const schema = Yup.object().shape({
    title: Yup.string().required('Please enter one title'),
});

export default function Project(props) {
    async function handleSubmit({ title }) {
        try {
            let { id } = props.match.params;

            let project = await api.post(`/users/${id}/project`, { title: title });

            if (project) {
                toast.success('Project saved successfully.');
                props.history.push('/main');
            }
        } catch (e) {
            toast.error('Project not saved. Please verify your data.');
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
                <div className="form-group button-card-actions">
                    <button className="btn btn-info button-save-project" size="lg" type="submit">
                        Salvar
                    </button>
                    <button
                        className="btn btn-secondary button-cancel-project"
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
