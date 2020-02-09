import * as Yup from 'yup';
import User from '../models/User';
import Project from '../models/Project';
class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
      const { id, name, email, provider } = await User.create(req.body);
      return res.status(200).json({ id, name, email, provider });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { email, oldPassword } = req.body;
      const user = await User.findByPk(req.userId);
      if (user.email !== email) {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ error: 'User already exists.' });
        }
      }
      // só faço isso se ele informou a senha antiga, isto é, quer alterar a senha
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match.' });
      }

      const { id, name, provider } = await user.update(req.body);

      return res.status(200).json({ id, name, email, provider });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async findAllProjects(req, res, next) {
    try {
      const user = await User.findById(req.params.id).populate({
        path: 'projects', // projetos
        populate: {
          path: 'lists', //  listas
          populate: {
            path: 'task', // Tarefas
            populate: {
              path: 'members', // Donos do cartao TODO: implementar multi donos
            },
          },
        },
      });
      return res.status(200).json(user.projects);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async findByIdProject(req, res) {
    try {
      const project = await Project.findById(req.params.id).populate({
        path: 'lists',
        populate: {
          path: 'task',
          populate: {
            path: 'members',
          },
        },
      });
      res.status(200).json(project);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async storeProject(req, res) {
    try {
      const { title } = req.body;
      const { id } = req.params;

      const project = await Project.create({
        title: title,
        lists: [],
        users: [id],
      });

      await User.findByIdAndUpdate(
        id,
        {
          $addToSet: { projects: project },
        },
        { new: true }
      );

      return res.status(200).json({
        data: project,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }

  async deleteProject(req, res) {
    try {
      const { id } = req.params;

      const project = await Project.findById(id);

      if (!project) {
        return res.status(400).json({ message: 'project not found' });
      }

      await Project.findByIdAndRemove(id);

      await User.update(
        { projects: { $in: [project._id] } },
        {
          $pull: { projects: project._id },
        },
        { multi: true }
      );

      return res.status(200).json({
        data: project,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }
}

export default new UserController();
