import { verify } from 'jsonwebtoken';
import { User } from '../models';

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id, email: decoded.email } });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;