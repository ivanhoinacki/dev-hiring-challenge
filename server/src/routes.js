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
// DONE
routes.post('/users', UserController.store);
// DONE
routes.post('/sessions', SessionController.store);

// Todas as rotas que forem chamadas a partir daqui tem que ser autenticada
routes.use(authMiddleware);
// DONE
routes.get('/users/:id/project', UserController.findAllProjects); // Busca todaos projetos do usuario
// DONE
routes.get('/users/project/:id', UserController.findByIdProject); // Busca o projecto seleciona por id
// DONE
routes.post('/users/:id/project', UserController.storeProject); // Cria um novo projeto para o usuario
// DONE
routes.delete('/users/project/:id', UserController.deleteProject); // delete o projeto do usuario

// Listas por projeto
// DONE
routes.post('/project/:id/list', ProjectController.storeList); // cria lista no projeto do usuario
// DONE
routes.delete('/project/lists/:id', ProjectController.deleteList); // delete o projeto do usuario

// tarefas por lista
// DONE
routes.post('/lists/:id/tasks', ListController.storeTask); // cria uma tarefa para a lista
// DONE
routes.delete('/lists/task/:id', ListController.deleteTask); // cria uma tarefa para a lista

export default routes;
