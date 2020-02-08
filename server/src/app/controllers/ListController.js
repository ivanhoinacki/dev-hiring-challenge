import List from '../models/List';
import Task from '../models/Task';

class ListController {
  async storeTask(req, res) {
    try {
      const { id } = req.params;
      const { title, descricao } = JSON.parse(req.body);

      let list = await List.findById(id).populate('project');

      if (!list) {
        return res.status(400).json({ message: 'List no found' });
      }

      let task = await Task.create({
        title: title || 'New Task',
        description: descricao || 'Digite uma descricao',
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
      return res.status(400).json(error);
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;

      let task = await Task.findById(cardId).populate({
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

      return res.status(400).json({
        data: task,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new ListController();
