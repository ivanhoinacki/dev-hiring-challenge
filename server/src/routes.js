import { Router } from 'express';
import morgan from 'morgan';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProjectController from './app/controllers/ProjectController';
import ListController from './app/controllers/ListController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

if (process.env.NODE_ENV === 'development') {
  routes.use(morgan('dev'));
}
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Todas as rotas que forem chamadas a partir daqui tem que ser autenticada
routes.use(authMiddleware);
routes.get('/users/:id/project', UserController.findAllProjects); // Busca todaos projetos do usuario
routes.get('/users/project/:id', UserController.findByIdProject); // Busca o projecto seleciona por id
routes.post('/users/:id/project', UserController.storeProject); // Cria um novo projeto para o usuario
routes.delete('/users/project/:id', UserController.deleteProject); // delete o projeto do usuario

// Listas por projeto
routes.post('/project/:id/list', ProjectController.storeList); // cria lista no projeto do usuario
routes.delete('/project/lists/:id', ProjectController.deleteList); // delete o projeto do usuario

// tarefas por lista
routes.post('/lists/:id/tasks', ListController.storeTask); // cria uma tarefa para a lista
routes.delete('/lists/task/:id', ListController.deleteTask); // cria uma tarefa para a lista

export default routes;
