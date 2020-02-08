import Project from '../models/Project';
import User from '../models/User';
import List from '../models/List';

class ProjectController {
  async storeList(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const project = await Project.findById(id);

      if (!project) {
        return res.status(401).json({ message: 'Project not found' });
      }
      const list = await List.create({
        title: title || 'New List',
        cards: [],
        board: id,
      });

      await Project.findByIdAndUpdate(id, {
        $addToSet: { lists: list._id },
      });

      return res.status(200).json({
        data: list,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }

  async deleteList(req, res) {
    try {
      const { id } = req.params;

      const project = await Project.findById(boardId);

      if (!project) {
        return res.status(401).json({ message: 'Project not found' });
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

export default new ProjectController();
