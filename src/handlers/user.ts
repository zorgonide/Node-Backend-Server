import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";
export const createUser = async (req, res, next) => {
  //add try catch for duplicate username
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = createJWT(user);
  return res.json({ token });
};
