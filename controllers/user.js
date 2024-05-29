import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../models";

const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, password, email });
    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const profile = async (req, res) => {
  res.send(req.user);
};

export default { register, login, profile };
