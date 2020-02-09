import List from '../models/List';
import Task from '../models/Task';

class ListController {
  async storeTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, dateCompletion } = req.body;

      const list = await List.findById(id).populate('project');

      if (!list) {
        return res.status(400).json({ message: 'List no found' });
      }

      const task = await Task.create({
        title: title || 'New Task',
        description: description || 'Digite uma descricao',
        dateCompletion: dateCompletion,
        list: id,
        activities: [],
        members: [req.userId],
      });

      await Task.findById(task._id).populate('members');

      await List.findByIdAndUpdate(id, {
        $addToSet: { task: task._id },
      });

      return res.status(200).json({
        data: task,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id).populate({
        path: 'list',
        populate: { path: 'project' },
      });

      if (!task) {
        return res.status(401).json({ message: 'Task not found' });
      }

      await Task.findByIdAndUpdate(
        id,
        {
          done: true,
        },
        { new: true }
      );

      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findById(id).populate({
        path: 'list',
        populate: {
          path: 'project',
        },
      });

      if (!task) {
        return res.status(200).json({ message: 'task not found' });
      }
      await Task.findByIdAndRemove(id);

      await List.update(
        { tasks: { $in: [task._id] } },
        {
          $pop: { tasks: task },
        }
      );

      return res.status(200).json({
        data: task,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }
}

export default new ListController();
