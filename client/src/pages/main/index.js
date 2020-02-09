import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Button, Form, FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap';

import { Container, Spanstatus } from './styles';

import api from '~/services/api';

export default function Main() {
    const [lists, setLists] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState('');
    const { id } = useSelector(state => state.user.profile);

    useEffect(() => {
        async function onLoad() {
            try {
                /**
                 * Carrega os projects do content
                 */

                const { data } = await api.get(`/users/${id}/project`);
                return setCurrentProject(data);
            } catch (e) {
                console.log(e);
            }
        }
        onLoad();
    }, [id]); // adiciona o valor de entrada no useEffect

    /************************   HANDLERS   ******************************/
    /**
     * Botao remove mesa selecionada
     */
    async function handlerRemoveProject(event) {
        try {
            event.preventDefault();
            let project = await api.delete(`/users/project/${event.target.listproject.value}`);
            if (project) {
                const { data } = await api.get(`/users/${id}/project`);
                return setCurrentProject(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function setCurrentProject(data) {
        setProjects(data);
        setProjectId(document.querySelector('[name="listproject"]').value);
        setLists(data[0].lists);
    }

    /**
     * Troca de project
     */
    async function handleProjectChange(event) {
        try {
            event.preventDefault();
            setProjectId(event.target.value);
            const { data } = await api.get(`/users/project/${event.target.value}`);
            setLists(data.lists);
        } catch (error) {
            console.error(error);
        }
    }

    async function onHandlerClickRemoveList(event) {
        try {
            await api.delete(`/project/lists/${event.target.value}`);
            const { data } = await api.get(`/users/${id}/project`);
            toast.success('List successfully deleted.');
            return setCurrentProject(data);
        } catch (error) {
            toast.error(error);
        }
    }

    async function onHandlerClickRemoveTask(event) {
        try {
            await api.delete(`/lists/task/${event.target.value}`);
            const { data } = await api.get(`/users/${id}/project`);
            toast.success('Task successfully deleted.');
            return setCurrentProject(data);
        } catch (error) {
            toast.error(error);
        }
    }

    async function onHandlerChangeCkeckComplete(event) {
        if (event.target.checked) {
            const confirm = window.confirm('You want to finish this task?');
            if (confirm) {
                await api.put(`/lists/task/${event.target.value}/done`);
            } else {
                return;
            }
        }
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
                    <Form.Control onChange={handleProjectChange} name="listproject" as="select">
                        {renderProjectOptions(projects)}
                    </Form.Control>
                    <Link to={`/project/new/${id}`}>
                        <Button className="button-add-project" variant="info">
                            <b>{'\uFF0B'}</b>&nbsp;Add
                        </Button>
                    </Link>
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
                <hr />
                <ListGroup>{renderTaskList(list.task, list._id)}</ListGroup>
                <hr />
            </div>
        ));
    }

    function renderTaskList(tasks, listId) {
        return [{}].concat(tasks).map((task, i) =>
            i !== 0 ? (
                <ListGroupItem key={i} className="description-card">
                    <span>
                        <b>
                            {task.title} -{' '}
                            <Spanstatus attrDone={task.done ? true : false}>
                                {task.done ? 'Done!' : 'Pending..'}{' '}
                            </Spanstatus>
                        </b>
                        <div className="mr-auto"></div>
                        <span>Check for Done </span>
                        <input
                            type="checkbox"
                            value={task._id}
                            checked={task.done ? true : false}
                            disabled={task.done ? true : false}
                            onChange={onHandlerChangeCkeckComplete}
                            aria-label="Checkbox for complete task"
                        ></input>
                        <div className="mr-auto"></div>
                        Conclusion: {format(new Date(task.dateCompletion), "dd 'de' MMMM", { locale: pt })}
                    </span>
                    <hr />
                    <div className="mr-auto"></div>
                    <p>{task.description}</p>
                    <hr />
                    <Button
                        disabled={task.done ? true : false}
                        className="button-edit-card"
                        variant="outline-danger"
                        onClick={onHandlerClickRemoveTask}
                        value={task._id}
                    >
                        Delete
                    </Button>

                    <span>{' Create at: ' + format(new Date(task.createdAt), 'dd/MM/yyyy', { locale: pt })}</span>
                </ListGroupItem>
            ) : (
                <ListGroupItem key="new">
                    <Link className="button" to={`/task/new/${listId}`}>
                        <Button variant="outline-info">
                            <b>{'\uFF0B'}</b>&nbsp;Task
                        </Button>
                    </Link>
                    <Button
                        className="button-remove-list"
                        variant="secondary"
                        onClick={onHandlerClickRemoveList}
                        value={listId}
                    >
                        Delete
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
            <div className="list-render row">{renderListFromProject(lists)}</div>
        </Container>
    );
}
