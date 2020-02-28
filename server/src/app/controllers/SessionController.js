import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConf from '../../config/auth';
import User from '../models/User';
class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.validatePassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name, provider } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
      },
      token: jwt.sign({ id, email }, authConf.secret, {
        expiresIn: authConf.expireIn,
      }),
    });
  }
}

export default new SessionController();
