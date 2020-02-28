import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getByIdProjectRequest, deleteProjectRequest } from '~/store/modules/user/actions';

const Projects = ({ currentProject, allProjects, handlerRemoveProject, handleProjectChange }) => {
    const { id } = useSelector(state => state.user.profile);

    return (
        <div className="projects-content">
            <Form onSubmit={e => handlerRemoveProject(e, id)}>
                <Form.Label>Projects</Form.Label>
                <Form.Control
                    onChange={handleProjectChange}
                    value={currentProject._id}
                    disabled={!allProjects.length}
                    name="listproject"
                    as="select"
                >
                    {[].concat(allProjects).map((project, i) => (
                        <option key={i} value={project._id}>
                            {project.title}
                        </option>
                    ))}
                </Form.Control>
                <Link to={`/project/new/${id}`}>
                    <Button className="button-add-project" variant="info">
                        <b>{'\uFF0B'}</b>&nbsp;Add
                    </Button>
                </Link>
                <Button
                    disabled={!allProjects.length}
                    className="button-remove-project"
                    type="submit"
                    variant="secondary"
                >
                    Delete
                </Button>
            </Form>
        </div>
    );
};

// Inputs values on state
const mapStateToProps = state => {
    return {
        currentProject: state.user.currentProject ? state.user.currentProject : [],
        allProjects: state.user.allProjects ? state.user.allProjects : [],
    };
};

// Input values on handlers event
const mapDispatchToProps = dispatch => {
    return {
        handlerRemoveProject: async (e, user) => {
            e.preventDefault();
            const confirm = window.confirm('You want to remove this Project?');
            if (confirm) {
                dispatch(deleteProjectRequest({ id: e.target.listproject.value, user: user }));
            }
        },
        handleProjectChange: async (e, id) => {
            dispatch(getByIdProjectRequest({ id: e.target.value }));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
