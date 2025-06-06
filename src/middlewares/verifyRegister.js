import { userModel } from "../models/index.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    let user = await userModel.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    // Email
    user = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Username!",
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

export default verifySignUp;
