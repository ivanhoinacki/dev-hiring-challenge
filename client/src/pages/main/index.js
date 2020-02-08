import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap';

import { Container } from './styles';

import api from '~/services/api';

export default function Main() {
    const [lists, setLists] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        async function onLoad() {
            try {
                /**
                 * Carrega os projects do content
                 */
                const projects = await api.get('', { params: { '': '' } });
                setProjects(projects);
                setProjectId(document.querySelector('[name="lista"]').value);
                setLists(projects[0].lists);
            } catch (e) {
                console.log(e);
            }
        }
        onLoad();
    }, []);

    /************************   HANDLERS   ******************************/
    /**
     * Botao remove mesa selecionada
     */
    async function handlerRemoveProject(event) {
        try {
            event.preventDefault();
            let project = await api.get('', { params: { '': '' } });
            if (project) {
                let projects = await api.get('', { params: { '': '' } });
                setProjects(projects);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Troca de project
     */
    async function handleProjectChange(event) {
        try {
            setProjectId(event.target.value);
            const projectsById = await api.get('', { params: { '': '' } });
            setLists(projectsById.lists);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Botao adicionar nova mesa
     */
    async function handlerAddProject(event) {
        try {
            event.preventDefault();
            let project = await api.get('', { params: { '': '' } });
            if (project) {
                let projects = await api.get('', { params: { '': '' } });
                setProjects(projects);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function onHandlerClickRemoveList(event) {
        let retorno = await api.get('', { params: { '': '' } });
        console.log(retorno);
    }

    async function onHandlerClickRemoveTask(event) {
        let retorno = await api.get('', { params: { '': '' } });
        console.log(retorno);
    }

    /************************   RENDERS   ******************************/
    function renderButtonAddListFromProject() {
        return (
            <div className="lists-content">
                <Form>
                    <Form.Label>Lists</Form.Label>
                    <br />
                    <Link key="new" to={`/list/new/${projectId}`}>
                        <Button className="button-new-list" variant="info">
                            <b>{'\uFF0B'}</b>&nbsp;Add
                        </Button>
                    </Link>
                </Form>
            </div>
        );
    }

    function renderProjectList(projects) {
        return (
            <div className="projects-content">
                <Form onSubmit={handlerRemoveProject}>
                    <Form.Label>Projects</Form.Label>
                    <Form.Control onChange={handleProjectChange} name="lista" as="select">
                        {renderProjectOptions(projects)}
                    </Form.Control>

                    <Button className="button-add-project" onClick={handlerAddProject} variant="info">
                        <b>{'\uFF0B'}</b>&nbsp;Add
                    </Button>
                    <Button className="button-remove-project" type="submit" variant="secondary">
                        Delete
                    </Button>
                </Form>
            </div>
        );
    }

    function renderProjectOptions(projects) {
        return [].concat(projects).map((project, i) => (
            <option key={i} value={project._id}>
                {project.title}
            </option>
        ));
    }

    function renderListFromProject(lists) {
        return [].concat(lists).map((list, i) => (
            <div className="col-md-3" key={i}>
                <FormLabel>{list.title}</FormLabel>
                <ListGroup>{renderTaskList(list.task, list._id)}</ListGroup>
                <hr />
            </div>
        ));
    }

    function renderTaskList(tasks, listId) {
        return [{}].concat(tasks).map((task, i) =>
            i !== 0 ? (
                <ListGroupItem key={i} className="description-card">
                    {task.title} -{' Data criação: ' + new Date(task.createdAt).toLocaleString()}
                    <div className="mr-auto"></div>
                    <Button
                        className="button-edit-card"
                        variant="outline-danger"
                        onClick={onHandlerClickRemoveTask}
                        value={task._id}
                    >
                        Delete
                    </Button>
                </ListGroupItem>
            ) : (
                <ListGroupItem key="new">
                    <Link className="button" to={`/task/new/${listId}`}>
                        <Button variant="outline-info">
                            <b>{'\uFF0B'}</b>&nbsp;Tarefa
                        </Button>
                    </Link>
                    <Button
                        className="button-remove-list"
                        variant="outline-info"
                        onClick={onHandlerClickRemoveList}
                        value={listId}
                    >
                        Remove
                    </Button>
                </ListGroupItem>
            )
        );
    }

    return (
        <Container>
            <div className="row">
                <div className="col-md-6">{renderButtonAddListFromProject()}</div>
                <div className="col-md-6">{renderProjectList(projects)}</div>
            </div>
            <div className="row">{renderListFromProject(lists)}</div>
        </Container>
    );
}
