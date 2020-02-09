import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import pt from 'date-fns/locale/pt';

import { Button, Form, FormLabel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Container, Spanstatus, HeaderTodoList } from './styles';

import { getProjectIdRequest } from '~/store/modules/user/actions';
import api from '~/services/api';

export default function Main() {
    const dispatch = useDispatch();

    const [arrLists, setLists] = useState([]);
    const [arrProjects, setProjects] = useState([]);

    const { id } = useSelector(state => state.user.profile);
    const { _id } = useSelector(state => state.user.currentProject) || {};

    useEffect(() => {
        async function onLoad() {
            try {
                /**
                 * Carrega os projects do content
                 */
                const { data } = await api.get(`/users/${id}/project`);
                setProjects(data);

                if (_id) {
                    return getProjectById(_id);
                } else {
                    if (data.length) {
                        return getProjectById(data[0]._id);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
        onLoad();
    }, [id, _id]); // adiciona o valor de entrada no useEffect

    function dateFormat(newDate) {
        let data = new Date(newDate);
        return `${data.getDate() + 1}/
    ${data.getMonth() + 1 < 9 ? `0${data.getMonth() + 1}` : data.getMonth() + 1}/
    ${data.getFullYear()}`;
    }

    /************************   HANDLERS   ******************************/
    /**
     * Botao remove mesa selecionada
     */
    async function handlerRemoveProject(event) {
        try {
            event.preventDefault();
            const confirm = window.confirm('You want to remove this Project?');
            if (confirm) {
                await api.delete(`/users/project/${event.target.listproject.value}`);
                const { data } = await api.get(`/users/${id}/project`);

                setProjects(data);
                setLists(data[0].lists);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getProjectById(id) {
        console.log(id);
        console.log('Atualizou a session e troxe dados atualizados..');
        dispatch(getProjectIdRequest({ id: id }));
        const { data } = await api.get(`/users/project/${id}`);
        return setLists(data.lists);
    }

    /**
     * Troca de project -- DONE
     */
    async function handleProjectChange(event) {
        try {
            event.preventDefault();
            dispatch(getProjectIdRequest({ id: event.target.value }));
            return getProjectById(event.target.value);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     *
     * Remove a lista do projeto -- DONE
     */
    async function onHandlerClickRemoveList(event) {
        try {
            await api.delete(`/project/lists/${event.target.value}`);
            toast.success('List successfully deleted.');
            console.log('removeu a lista');
            return getProjectById(_id);
        } catch (error) {
            toast.error(error);
        }
    }

    async function onHandlerClickRemoveTask(event) {
        try {
            await api.delete(`/lists/task/${event.target.value}`);
            toast.success('Task successfully deleted.');
            console.log('removeu a tarefa');
            return getProjectById(_id);
        } catch (error) {
            toast.error(error);
        }
    }

    async function onHandlerChangeCkeckComplete(event) {
        if (event.target.checked) {
            const confirm = window.confirm('You want to finish this task?');
            if (confirm) {
                await api.put(`/lists/task/${event.target.value}/done`);
                toast.success('Task successfully done.');
                return getProjectById(_id);
            } else {
                return;
            }
        }
    }

    /************************   RENDERS   ******************************/
    function renderButtonAddListFromProject() {
        return (
            <div className="lists-content" hidden={_id ? '' : 'hidden'}>
                <Form>
                    <Form.Label>Lists</Form.Label>
                    <br />
                    <Link key="new" to={`/list/new/${_id}`}>
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
                    <Form.Control onChange={handleProjectChange} value={_id} name="listproject" as="select">
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
                        Conclusion: {dateFormat(task.dateCompletion)}
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
            <HeaderTodoList>TODO LIST</HeaderTodoList>
            <div className="row">
                <div className="col-md-6">{renderButtonAddListFromProject()}</div>
                <div className="col-md-6">{renderProjectList(arrProjects)}</div>
            </div>
            <div className="list-render row">{renderListFromProject(arrLists)}</div>
        </Container>
    );
}
